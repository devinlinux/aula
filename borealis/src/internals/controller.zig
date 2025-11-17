const std = @import("std");
const User = @import("../types/user.zig").User;
const Group = @import("../types/group.zig").Group;
const Major = @import("../types/major.zig").Major;
const UserDatabase = @import("user_db.zig").UserDatabase;
const GroupDatabase = @import("group_db.zig").GroupDatabase;
const Mode = @import("mode.zig").Mode;
const Message = @import("message.zig").Message;
const Result = @import("message.zig").Result;

const CMD_END: []const u8 = "END";
const CMD_CREATE_USER: []const u8 = "create_user";  //  user_json
const CMD_CREATE_GROUP: []const u8 = "create_group";  //  group_json
const CMD_VALID_PASSWORD: []const u8 = "verify_password";  //  id hash
const CMD_ADD_USER_TO_GROUP: []const u8 = "add_to_group";  //  user_name or id            |  Maybe use new type to that has id | user_id and group_id
const CMD_REMOVE_USER_FROM_GROUP: []const u8 = "remove_from_group";  //  user_name or id  |  and name                          | user_id and group_id
const CMD_GET_USER: []const u8 = "get_user";  //  id
const CMD_GET_GROUP: []const u8 = "get_group";  //  id
const CMD_GET_GROUPS: []const u8 = "get_groups";  //  returns all groups

const CODE_SUCCESS: []const u8 = "SUCCESS";
const CODE_FAILURE: []const u8 = "FAILURE";

pub fn recoverDatabase(dir: []const u8) void {
    const allocator = std.heap.smp_allocator;

    var user_db = UserDatabase.init(allocator, dir, Mode.recover);
    defer user_db.deinit();

    var group_db = GroupDatabase.init(allocator, dir, Mode.recover);
    defer group_db.deinit();

    repl(allocator, &user_db, &group_db) catch |err| {
        std.debug.print("Error during repl: {}\n", .{err});
    };
}

pub fn newDatabase(dir: []const u8) void {
    const allocator = std.heap.smp_allocator;

    var user_db = UserDatabase.init(allocator, dir, Mode.new);
    defer user_db.deinit();

    var group_db = GroupDatabase.init(allocator, dir, Mode.new);
    defer group_db.deinit();

    repl(allocator, &user_db, &group_db) catch |err| {
        std.debug.print("Error during repl: {}\n", .{err});
    };
}

fn repl(allocator: std.mem.Allocator, user_db: *UserDatabase, group_db: *GroupDatabase) !void {
    var stdin_buffer: [1024]u8 = undefined;
    var stdin = std.fs.File.stdin().reader(&stdin_buffer);

    while (true) {
        const line = try stdin.interface.takeDelimiter('\n');
        var input = std.mem.splitScalar(u8, line.?, ' ');

        var input_list = std.array_list.Managed([]const u8).init(allocator);
        defer input_list.deinit();

        while (input.next()) |part| {
            try input_list.append(part);
        }

        var out: std.Io.Writer.Allocating = .init(allocator);

        if (std.mem.eql(u8, CMD_END, input_list.items[0])) {
            break;
        } else if (std.mem.eql(u8, CMD_CREATE_USER, input_list.items[0])) {
            const parsed_user = std.json.parseFromSlice(User, allocator, input_list.items[0], .{}) catch |err| {
                std.debug.print("Error deserializing user from input, this should never happen!: {}\n", .{err});
                std.process.exit(1);
            };

            const user = parsed_user.value;
            user_db.*.insertUser(user) catch {
                const msg = Message {
                    .result = .failure,
                    .message = "Failed to create user",
                };
                try std.json.Stringify.value(msg, .{}, &out.writer);
                std.debug.print("{s}\n", .{out.toArrayList().items});
                continue;
            };

            const msg = Message {
                .result = .success,
                .message = "Successfully created user",
            };
            try std.json.Stringify.value(msg, .{}, &out.writer);
            std.debug.print("{s}\n", .{out.toArrayList().items});
        } else if (std.mem.eql(u8, CMD_CREATE_GROUP, input_list.items[0])) {
            const parsed_group = std.json.parseFromSlice(Group, allocator, input_list.items[0], .{}) catch |err| {
                std.debug.print("Error deserializing group from input, this should never happen!: {}\n", .{err});
                std.process.exit(1);
            };

            const group = parsed_group.value;
            group_db.*.insertGroup(group) catch {
                const msg = Message {
                    .result = .failure,
                    .message = "Failed to create group",
                };
                try std.json.Stringify.value(msg, .{}, &out.writer);
                std.debug.print("{s}\n", .{out.toArrayList().items});
                continue;
            };

            const msg = Message {
                .result = .success,
                .message = "Successfully created group",
            };
            try std.json.Stringify.value(msg, .{}, &out.writer);
            std.debug.print("{s}\n", .{out.toArrayList().items});
        } else if (std.mem.eql(u8, CMD_VALID_PASSWORD, input_list.items[0])) {
            if (input_list.items.len < 3) {
                std.debug.print("Expected 3 arguments, got {d}\n", .{input_list.items.len});
                std.process.exit(1);
            }

            const id = try std.fmt.parseInt(usize, input_list.items[1], 10);
            const hash = input_list.items[2];

            const user = try user_db.getUser(id);
            if (user == null) {
                const msg = Message {
                    .result = .failure,
                    .message = "Username or password incorrect",
                };
                try std.json.Stringify.value(msg, .{}, &out.writer);
                std.debug.print("{s}\n", .{out.toArrayList().items});
                continue;
            }

            if (std.mem.eql(u8, hash, user.?.password)) {
                const msg = Message {
                    .result = .success,
                    .message = "Successfully logged in",
                };
                try std.json.Stringify.value(msg, .{}, &out.writer);
                std.debug.print("{s}\n", .{out.toArrayList().items});
            } else {
                const msg = Message {
                    .result = .failure,
                    .message = "Username or password incorrect",
                };
                try std.json.Stringify.value(msg, .{}, &out.writer);
                std.debug.print("{s}\n", .{out.toArrayList().items});
                continue;
            }
        } else if (std.mem.eql(u8, CMD_ADD_USER_TO_GROUP, input_list.items[0])) {
            if (input_list.items.len < 3) {
                std.debug.print("Expected 3 arguments, got {d}\n", .{input_list.items.len});
                std.process.exit(1);
            }

            const user_id = try std.fmt.parseInt(usize, input_list.items[1], 10);
            const group_id = try std.fmt.parseInt(usize, input_list.items[2], 10);

            var user = try user_db.getUser(user_id);
            var group = try group_db.getGroup(group_id);

            if (user == null or group == null) {
                const msg = Message {
                    .result = .failure,
                    .message = "User or group does not exist",
                };

                try std.json.Stringify.value(msg, .{}, &out.writer);
                std.debug.print("{s}\n", .{out.toArrayList().items});
                continue;
            }

            try user.?.addGroup(group.?);
            try group.?.addUser(user.?);

            try user_db.insertUser(user.?);
            try group_db.insertGroup(group.?);

            const msg = Message {
                .result = .success,
                .message = "Successfully added user to group",
            };

            try std.json.Stringify.value(msg, .{}, &out.writer);
            std.debug.print("{s}\n", .{out.toArrayList().items});
        } else if (std.mem.eql(u8, CMD_REMOVE_USER_FROM_GROUP, input_list.items[0])) {
            if (input_list.items.len < 3) {
                std.debug.print("Expected 3 arguments, got {d}\n", .{input_list.items.len});
                std.process.exit(1);
            }

            const user_id = try std.fmt.parseInt(usize, input_list.items[1], 10);
            const group_id = try std.fmt.parseInt(usize, input_list.items[2], 10);

            var user = try user_db.getUser(user_id);
            var group = try group_db.getGroup(group_id);

            if (user == null or group == null) {
                const msg = Message {
                    .result = .failure,
                    .message = "User or group does not exist",
                };

                try std.json.Stringify.value(msg, .{}, &out.writer);
                std.debug.print("{s}\n", .{out.toArrayList().items});
                continue;
            }

            user.?.removeGroup(group.?);
            group.?.removeUser(user.?);

            try user_db.insertUser(user.?);
            try group_db.insertGroup(group.?);

            const msg = Message {
                .result = .success,
                .message = "Successfully removed user from group",
            };

            try std.json.Stringify.value(msg, .{}, &out.writer);
            std.debug.print("{s}\n", .{out.toArrayList().items});
        } else if (std.mem.eql(u8, CMD_GET_USER, input_list.items[0])) {

        } else if (std.mem.eql(u8, CMD_GET_GROUP, input_list.items[0])) {

        } else if (std.mem.eql(u8, CMD_GET_GROUPS, input_list.items[0])) {

        } else {

        }
    }
}
