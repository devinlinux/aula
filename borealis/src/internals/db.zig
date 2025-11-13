const std = @import("std");
const User = @import("../types/user.zig").User;

const DB_FILE: []const u8 = "users.db";
const MEMTABLE_MAX_SIZE: usize = 100_000;

pub const Mode = enum {
    new,
    recover,
};

pub const UserDatabase = struct {
    memtable: std.AutoHashMap(usize, User),
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
            .file_path = file_path,
        };
    }

    pub fn deinit(self: *UserDatabase) void {
        self.memtable.deinit();
    }

    pub fn flush(self: *UserDatabase) !void {
        _ = self;
    }

    pub fn insertUser(self: *UserDatabase, user: User) void {
        self.memtable.put(user.id, user);
    }
};
