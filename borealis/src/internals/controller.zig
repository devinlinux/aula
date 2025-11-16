const std = @import("std");
const User = @import("../types/user.zig").User;
const Major = @import("../types/major.zig").Major;
const UserDatabase = @import("user_db.zig").UserDatabase;
const Mode = @import("user_db.zig").Mode;

const CMD_END: []const u8 = "END";
const CMD_ADD_USER: []const u8 = "add_user";  //  user_json
const CMD_VALID_PASSWORD: []const u8 = "password";  //  id hash

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

    _ = db.getUser(5) catch |err| {
            std.debug.print("Error during et: {}\n", .{err});
    };

    db.flush() catch |err| {
        std.debug.print("Error during flush: {}\n", .{err});
    };

    repl(db);
}

pub fn newDatabase(dir: []const u8) void {
    const allocator = std.heap.smp_allocator;

    var db = UserDatabase.init(allocator, dir, Mode.new);
    defer db.deinit();

    repl(db);
}

fn repl(db: UserDatabase) void {
    var stdin_buffer: [1024]u8 = undefined;
    var stdin = std.fs.File.stdin().reader(&stdin_buffer);

    var line_buffer: [1024]u8 = undefined;
    var writer: std.Io.Writer = .fixed(&line_buffer);

    const line_len = stdin.interface.streamDelimiterLimit(&writer, '\n', .unlimited) catch |err| {
        std.debug.print("Error when reading in from stdin: {}\n", .{err});
        std.process.exit(1);
    };
    const input = line_buffer[0..line_len];

    if (std.mem.eql(u8, CMD_ADD_USER, input)) {
        _ = db;
    }
}
