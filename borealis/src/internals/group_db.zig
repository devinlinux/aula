const std = @import("std");
const PriorityQueue = std.PriorityQueue;
const Group = @import("../types/group.zig").Group;
const Mode = @import("mode.zig").Mode;
const User = @import("../types/user.zig").User;

const DB_FILE: []const u8 = "groups.db";
const WRITE_FILE_PATH: []const u8 = "groups_flush.db";
const MAX_LINE_LENGTH: usize = 1024 * 1024;
const MEMTABLE_MAX_SIZE: usize = 1000;

//  TODO: generalize with user database
pub const GroupDatabase = struct {
    memtable: std.AutoHashMap(usize, Group),
    dir: []const u8,
    file_path: []const u8,

    pub fn init(allocator: std.mem.Allocator, dir: []const u8, mode: Mode) GroupDatabase {
        const stat = std.fs.cwd().statFile(dir) catch null;
        const exists = stat != null and stat.?.kind == .directory;

        const file_path = std.fmt.allocPrint(allocator, "{s}/{s}", .{dir, DB_FILE}) catch |err| {
            std.debug.print("Error creating file path for database: {}\n", .{err});
            std.process.exit(1);
        };
        defer allocator.free(file_path);

        switch (mode) {
            .new => {
                if (!exists) {
                    std.fs.cwd().makeDir(dir) catch |err| {
                        std.debug.print("Failed to create directory: {}\n", .{err});
                        std.process.exit(1);
                    };
                } else {
                    std.debug.print("Directory {s} already exists, perhaps try recovering\n", .{dir});
                    std.process.exit(1);
                }

                const file = std.fs.cwd().createFile(file_path, .{}) catch |err| {
                    std.debug.print("Error creating file for new group database: {}\n", .{err});
                    std.process.exit(1);
                };
                defer file.close();
            },
            .recover => {
                if (!exists) {
                    std.debug.print("Directory {s} for recovery does not exist\n", .{dir});
                    std.process.exit(1);
                }
            },
        }

        return GroupDatabase {
            .memtable = std.AutoHashMap(usize, Group).init(allocator),
            .dir = dir,
            .file_path = file_path,
        };
    }

    pub fn deinit(self: *GroupDatabase) void {
        self.memtable.deinit();
    }

    pub fn insertGroup(self: *GroupDatabase, group: Group) !void {
        try self.memtable.put(group.id, group);

        if (self.memtable.count() >= MEMTABLE_MAX_SIZE) {
            try self.flush();
        }
    }

    //  TODO: binary search
    pub fn getGroup(self: *GroupDatabase, id: usize) !?Group {
        if (self.memtable.get(id)) |group| {
            return group;
        }

        const allocator = std.heap.smp_allocator;

        const path = try std.fmt.allocPrint(allocator, "{s}/{s}", .{self.dir, DB_FILE});
        defer allocator.free(path);

        const file = try std.fs.cwd().openFile(path, .{});
        defer file.close();

        var buffer: [MAX_LINE_LENGTH]u8 = undefined;
        var reader = file.reader(&buffer);

        while (try reader.interface.takeDelimiter('\n')) |line| {
            const parsed_group = std.json.parseFromSlice(Group, allocator, line, .{}) catch |err| {
                std.debug.print("Error deserializing group from groups db, this should never happen!: {}\n", .{err});
                std.process.exit(1);
            };

            const group = parsed_group.value;
            if (group.id == id) return group;
        }

        return null;
    }

    pub fn addToGroup(self: *GroupDatabase, group: usize, user: User) !bool {
        var grp = try self.getGroup(group);
        if (!grp) {
            return false;
        }

        try grp.?.addUser(user);
        try self.insertGroup(grp);
        return true;
    }

    pub fn flush(self: *GroupDatabase) !void {
        const allocator = std.heap.smp_allocator;

        const read_file_path = try std.fmt.allocPrint(allocator, "{s}/{s}", .{self.dir, DB_FILE});
        defer allocator.free(read_file_path);

        const read_file = try std.fs.cwd().openFile(read_file_path, .{});
        defer read_file.close();

        const write_file_path = try std.fmt.allocPrint(allocator, "{s}/{s}", .{self.dir, WRITE_FILE_PATH});
        defer allocator.free(write_file_path);

        const write_file = try std.fs.cwd().createFile(write_file_path, .{});
        defer write_file.close();

        try write_file.seekFromEnd(0);

        var write_buffer: [MAX_LINE_LENGTH]u8 = undefined;
        var writer = write_file.writer(&write_buffer);
        var out: std.Io.Writer.Allocating = .init(allocator);

        var read_buffer: [MAX_LINE_LENGTH]u8 = undefined;
        var reader = read_file.reader(&read_buffer);

        var groups = PriorityQueue(Group, void, Group.compareGroup).init(allocator, undefined);
        defer groups.deinit();

        while (try reader.interface.takeDelimiter('\n')) |line| {
            const parsed_group = std.json.parseFromSlice(Group, allocator, line, .{}) catch |err| {
                std.debug.print("Error deserializing group from groups db, this should never happen!: {}\n", .{err});
                std.process.exit(1);
            };

            const group = parsed_group.value;

            if (!self.memtable.contains(group.id)) {
                try groups.add(group);
            }
        }

        var iterator = self.memtable.iterator();
        while (iterator.next()) |g| {
            try groups.add(g.value_ptr.*);
            _ = self.memtable.remove(g.key_ptr.*);
        }

        while (groups.removeOrNull()) |g| {
            try std.json.Stringify.value(g, .{}, &out.writer);
            var arr = out.toArrayList();
            defer arr.deinit(allocator);

            const json = try std.fmt.allocPrint(allocator, "{s}\n", .{arr.items});
            defer allocator.free(json);

            try writer.interface.writeAll(json);
        }

        try std.fs.cwd().deleteFile(read_file_path);
        try std.fs.rename(std.fs.cwd(), write_file_path, std.fs.cwd(), read_file_path);
    }
};
