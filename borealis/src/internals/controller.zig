const std = @import("std");
const User = @import("../types/user.zig").User;
const Major = @import("../types/major.zig").Major;
const UserDatabase = @import("user_db.zig").UserDatabase;
const Mode = @import("mode.zig").Mode;

const CMD_END: []const u8 = "END";
const CMD_CREATE_USER: []const u8 = "create_user";  //  user_json
const CMD_VALID_PASSWORD: []const u8 = "verify_password";  //  id hash
const CMD_ADD_USER_TO_GROUP: []const u8 = "add_to_group";  //  user_name or id            |  Maybe use new type to that has id
const CMD_REMOVE_USER_FROM_GROUP: []const u8 = "remove_from_group";  //  user_name or id  |  and name
const CMD_GET_USER: []const u8 = "get_user";  //  id
const CMD_GET_GROUP: []const u8 = "get_group";  //  id
const CMD_GET_GROUPS: []const u8 = "get_groups";  //  returns all groups

pub fn recoverDatabase(dir: []const u8) void {
    const allocator = std.heap.smp_allocator;

    var user_db = UserDatabase.init(allocator, dir, Mode.recover);
    defer user_db.deinit();

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

        user_db.insertUser(user) catch |err| {
            std.debug.print("Error while inserting user {d}: {}\n", .{id, err});
        };
    }

    _ = user_db.getUser(5) catch |err| {
            std.debug.print("Error during get: {}\n", .{err});
    };

    user_db.flush() catch |err| {
        std.debug.print("Error during flush: {}\n", .{err});
    };

    repl(allocator, &user_db) catch |err| {
        std.debug.print("Error during repl: {}\n", .{err});
    };
}

pub fn newDatabase(dir: []const u8) void {
    const allocator = std.heap.smp_allocator;

    var user_db = UserDatabase.init(allocator, dir, Mode.new);
    defer user_db.deinit();

    repl(allocator, &user_db) catch |err| {
        std.debug.print("Error during repl: {}\n", .{err});
    };
}

fn repl(allocator: std.mem.Allocator, user_db: *UserDatabase) !void {
    var stdin_buffer: [1024]u8 = undefined;
    var stdin = std.fs.File.stdin().reader(&stdin_buffer);

    while (true) {
        const line = try stdin.interface.takeDelimiter('\n');
        const input = line.?;

        if (std.mem.eql(u8, CMD_END, input)) {
            break;
        } else if (std.mem.eql(u8, CMD_CREATE_USER, input)) {
            const parsed_user = std.json.parseFromSlice(User, allocator, input, .{}) catch |err| {
                std.debug.print("Error deserializing user from input, this should never happen!: {}\n", .{err});
                std.process.exit(1);
            };

            const user = parsed_user.value;
            try user_db.*.insertUser(user);
        } else if (std.mem.eql(u8, CMD_VALID_PASSWORD, input)) {

        } else if (std.mem.eql(u8, CMD_ADD_USER_TO_GROUP, input)) {

        } else if (std.mem.eql(u8, CMD_REMOVE_USER_FROM_GROUP, input)) {

        } else if (std.mem.eql(u8, CMD_GET_USER, input)) {

        } else if (std.mem.eql(u8, CMD_GET_GROUP, input)) {

        } else if (std.mem.eql(u8, CMD_GET_GROUPS, input)) {

        } else {

        }
    }
}
