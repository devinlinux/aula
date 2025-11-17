const std = @import("std");
const Order = std.math.Order;
const Major = @import("major.zig").Major;
const Group = @import("group.zig").Group;
const StrippedGroup = @import("stripped_group.zig").StrippedGroup;

pub const User = struct {
    id: usize,
    email: []const u8,  //  max 27 chars
    password: []const u8,  // max 64 chars
    first_name: []const u8,  //  max 15 chars
    last_name: []const u8,  //  max 15 chars
    profile_picture: []const u8,  //  max 32 chars
    major: Major,
    graduation_year: i16,
    groups: std.ArrayList(Group),

    pub fn addGroup(self: *User, group: Group) !void {
        const grp = StrippedGroup { .id = group.id, .name = group.name };
        try self.groups.append(grp);
    }

    pub fn compareUser(context: void, user1: User, user2: User) Order {
        _ = context;

        if (user1.id < user2.id) return .lt;
        if (user1.id > user2.id) return .gt;
        return .eq;
    }
};
