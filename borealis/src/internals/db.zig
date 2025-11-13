const std = @import("std");
const User = @import("../types/user.zig").User;

const READ_FILE: []const u8 = "users_read.db";
const WRITE_FILE: []const u8  = "users_write.db";

pub const Mode = enum {
    new,
    recover,
};

pub const Borealis = struct {
    memtable: std.AutoHashMap(usize, User),
    read_path: []const u8,
    write_path: []const u8,

    pub fn init(allocator: std.mem.Allocator, dir: []const u8, mode: Mode) Borealis {
        const stat = std.fs.cwd().statFile(dir) catch null;
        const exists = stat != null and stat.?.kind == .directory;

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
            },
            .recover => {
                if (!exists) {
                    std.debug.print("Directory {s} for recovery does not exist", .{dir});
                    std.process.exit(1);
                }
            },
        }

        const read_path = std.fmt.allocPrint(allocator, "{s}/{s}", .{dir, READ_FILE}) catch |err| {
            std.debug.print("Error creating read path for database: {}", .{err});
            std.process.exit(1);
        };
        defer allocator.free(read_path);

        const write_path = std.fmt.allocPrint(allocator, "{s}/{s}", .{dir, WRITE_FILE}) catch |err| {
            std.debug.print("Error creating write path for database: {}", .{err});
            std.process.exit(1);
        };
        defer allocator.free(write_path);

        return Borealis {
            .memtable = std.AutoHashMap(usize, User).init(allocator),
            .read_path = read_path,
            .write_path = write_path,
        };
    }

    pub fn deinit(self: *Borealis) void {
        self.memtable.deinit();
    }
};
