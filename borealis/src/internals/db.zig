const std = @import("std");
const User = @import("../types/user.zig").User;

const DB_FILE: []const u8 = "users.db";
const WRITE_FILE_PATH: []const u8 = "users_flush.db";
const MAX_LINE_LENGTH: usize = 312;
const MEMTABLE_MAX_SIZE: usize = 100_000;

pub const Mode = enum {
    new,
    recover,
};

pub const UserDatabase = struct {
    memtable: std.AutoHashMap(usize, User),
    dir: []const u8,
    file_path: []const u8,

    pub fn init(allocator: std.mem.Allocator, dir: []const u8, mode: Mode) UserDatabase {
        const stat = std.fs.cwd().statFile(dir) catch null;
        const exists = stat != null and stat.?.kind == .directory;

        const file_path = std.fmt.allocPrint(allocator, "{s}/{s}", .{dir, DB_FILE}) catch |err| {
            std.debug.print("Error creating file path for database: {}", .{err});
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
                    std.debug.print("Directory {s} already exists, perhaps try recovering", .{dir});
                    std.process.exit(1);
                }

                const file = std.fs.cwd().createFile(file_path, .{}) catch |err| {
                    std.debug.print("Error creating file for new user database: {}\n", .{err});
                    std.process.exit(1);
                };
                defer file.close();

            },
            .recover => {
                if (!exists) {
                    std.debug.print("Directory {s} for recovery does not exist", .{dir});
                    std.process.exit(1);
                }
            },
        }


        return UserDatabase {
            .memtable = std.AutoHashMap(usize, User).init(allocator),
            .dir = dir,
            .file_path = file_path,
        };
    }

    pub fn deinit(self: *UserDatabase) void {
        self.memtable.deinit();
    }

    pub fn flush(self: *UserDatabase) !void {
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

        var write_buffer: [MAX_LINE_LENGTH + 1]u8 = undefined;
        var writer = write_file.writer(&write_buffer);
        var out: std.Io.Writer.Allocating = .init(allocator);

        var buffer: [MAX_LINE_LENGTH + 1]u8 = undefined;
        var reader = read_file.reader(&buffer);
        while (try reader.interface.takeDelimiter('\n')) |line| {
            const parsed_user = std.json.parseFromSlice(User, allocator, line, .{}) catch |err| {
                std.debug.print("Error deserializing user from users db, this should not happen!: {}\n", .{err});
                std.process.exit(1);
            };

            const user = parsed_user.value;

            if (self.memtable.contains(user.id) and std.meta.eql(self.memtable.get(user.id).?, user)) {
                const memtable_user = self.memtable.get(user.id).?;
                _ = self.memtable.remove(memtable_user.id);

                try std.json.Stringify.value(user, .{}, &out.writer);
                var arr = out.toArrayList();
                defer arr.deinit(allocator);

                const json = try std.fmt.allocPrint(allocator, "{s}\n", .{arr.items});
                try writer.interface.writeAll(json);
            } else {
                _ = self.memtable.remove(user.id);

                const json = try std.fmt.allocPrint(allocator, "{s}\n", .{line});
                try writer.interface.writeAll(json);
            }
        }

        try std.fs.cwd().deleteFile(read_file_path);
        try std.fs.rename(std.fs.cwd(), write_file_path, std.fs.cwd(), read_file_path);
    }

    //  TODO: flush if at max size
    pub fn insertUser(self: *UserDatabase, user: User) void {
        self.memtable.put(user.id, user);
    }
};
