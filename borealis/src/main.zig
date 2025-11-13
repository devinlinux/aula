const std = @import("std");
const clap = @import("clap.zig");
const User = @import("types/user.zig").User;
const Major = @import("types/major.zig").Major;

pub fn main() !void {
    var args = std.process.args();
    clap.evaluateArgs(&args);

    const user = User {
        .id = 0,
        .email = "mbobrows@villanova.edu",
        .password = "HASH-HERE",
        .first_name = "Michael",
        .last_name = "Bobrowski",
        .profile_picture = "UUID-HERE",
        .major = Major.computer_engineering,
        .graduation_year = 2029,
    };

    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    const allocator = gpa.allocator();
    defer std.debug.assert(gpa.deinit() == .ok);

    var out: std.io.Writer.Allocating = .init(allocator);
    try std.json.Stringify.value(user, .{}, &out.writer);
    var arr = out.toArrayList();
    defer arr.deinit(allocator);

    std.debug.print("{s}\n\n\n", .{arr.items});
}
