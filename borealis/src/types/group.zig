const std = @import("std");
const Order = std.math.Order;
const StrippedUser = @import("stripped_user.zig").StrippedUser;
const Time = @import("time.zig").Time;
const User = @import("user.zig").User;

pub const Group = struct {
    id: usize,
    name: []const u8,
    members: std.ArrayList(StrippedUser),
    times: []const Time,

    pub fn init(id: usize, name: []const u8, times: []const Time) Group {
        const allocator = std.heap.smp_allocator;

        return Group {
            .id = id,
            .name = name,
            .members = std.array_list.Managed(StrippedUser).init(allocator),
            .times = times,
        };
    }

    pub fn deinit(self: *Group) void {
        self.members.deinit();
    }

    pub fn addUser(self: *Group, user: User) !void {
        const allocator = std.heap.smp_allocator;
        const full_name = std.fmt.allocPrint(allocator, "{s} {s}", .{user.first_name, user.last_name}) catch |err| {
            std.debug.print("Error creating full name for user: {}\n", .{err});
            std.process.exit(1);
        };

        const stripped = StrippedUser{ .id = user.id, .full_name = full_name };
        try self.members.append(stripped);
    }

    pub fn compareGroup(context: void, group1: Group, group2: Group) Order {
        _ = context;

        if (group1.id < group2.id) return .lt;
        if (group1.id > group2.id) return .gt;
        return .eq;
    }
};
