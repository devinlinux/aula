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

        const read_file_path = std.fmt.allocPrint(allocator, "{s}/{s}", .{self.dir, DB_FILE}) catch |err| {
            std.debug.print("Error creating read file path for flush: {}\n", .{err});
            return err;
        };
        defer allocator.free(read_file_path);

        const read_file = std.fs.cwd().openFile(read_file_path, .{}) catch |err| {
            std.debug.print("Error opening users db for reading: {}\n", .{err});
            return err;
        };
        defer read_file.close();

        const write_file_path = std.fmt.allocPrint(allocator, "{s}/{s}", .{self.dir, WRITE_FILE_PATH}) catch |err| {
            std.debug.print("Error creating write file path for flush: {}\n", .{err});
            return err;
        };
        defer allocator.free(write_file_path);

        const write_file = std.fs.cwd().createFile(write_file_path, .{}) catch |err| {
            std.debug.print("Error creating write file for flush: {}\n", .{err});
            return err;
        };
        defer write_file.close();

        var buffer: [MAX_LINE_LENGTH + 1]u8 = undefined;
        var reader = read_file.reader(&buffer);
        while (try reader.interface.takeDelimiter('\n')) |line| {
            const parsed_user = std.json.parseFromSlice(User, allocator, line, .{}) catch |err| {
                std.debug.print("Error deserializing user from users db, this should not happen!: {}\n", .{err});
                std.process.exit(1);
            };

            const user = parsed_user.value;

            if (self.memtable.contains(user.id) and std.meta.eql(self.memtable.get(user.id).?, user)) {
                _ = self.memtable.remove(user.id);
                //  write line to write_file
            } else {
                //  write from memtable to write_file
            }

            std.debug.print("{s}\n", .{user.first_name});
        }
    }

    //  TODO: flush if at max size
    pub fn insertUser(self: *UserDatabase, user: User) void {
        self.memtable.put(user.id, user);
    }
};
