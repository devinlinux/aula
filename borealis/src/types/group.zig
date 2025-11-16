const std = @import("std");
const Order = std.math.Order;
const StrippedUser = @import("stripped_user.zig").StrippedUser;
const Time = @import("time.zig").Time;

pub const Group = struct {
    id: usize,
    name: []const u8,
    members: std.ArrayList(StrippedUser),
    times: std.ArrayList(Time),

    pub fn compareGroup(context: void, group1: Group, group2: Group) Order {
        _ = context;

        if (group1.id < group2.id) return .lt;
        if (group1.id > group2.id) return .gt;
        return .eq;
    }
};
