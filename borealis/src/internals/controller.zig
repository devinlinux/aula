const std = @import("std");
const User = @import("../types/user.zig").User;
const Major = @import("../types/major.zig").Major;
const UserDatabase = @import("db.zig").UserDatabase;
const Mode = @import("db.zig").Mode;

pub fn recoverDatabase(dir: []const u8) void {
    const allocator = std.heap.smp_allocator;

    var db = UserDatabase.init(allocator, dir, Mode.recover);
    defer db.deinit();

    const ids = [_]usize{1, 2, 4, 5, 6, 9, 11};
    for (ids) |id| {
        const user = User {
            .id = id,
            .email = "mbobrows@villanova.edu",
            .password = "hash",
            .first_name = "Michael",
            .last_name = "Bobrowski",
            .profile_picture = "UUID",
            .major = Major.computer_engineering,
            .graduation_year = 2029,
        };

        db.insertUser(user) catch |err| {
            std.debug.print("Error while inserting user {d}: {}\n", .{id, err});
        };
    }

    db.flush() catch |err| {
        std.debug.print("Error during flush: {}\n", .{err});
    };
}

pub fn newDatabase(dir: []const u8) void {
    const allocator = std.heap.smp_allocator;

    var db = UserDatabase.init(allocator, dir, Mode.new);
    defer db.deinit();
}
