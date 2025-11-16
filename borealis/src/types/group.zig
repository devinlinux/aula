const std = @import("std");
const User = @import("user.zig").User;
const Time = @import("time.zig").Time;

pub const Group = struct {
    name: []const u8,
    members: std.ArrayList(User),
    times: std.ArrayList(Time),
};
