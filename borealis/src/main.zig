const std = @import("std");
const clap = @import("clap.zig");
const User = @import("types/user.zig").User;
const Major = @import("types/major.zig").Major;

pub fn main() !void {
    var args = std.process.args();
    clap.evaluateArgs(&args);

    const user = User {
        .id = std.math.maxInt(usize),
        .email = "mbobrows@villanova.edu",
        .password = "hash",
        .first_name = "Michael",
        .last_name = "Bobrowski",
        .profile_picture = "uuid",
        .major = Major.computer_engineering,
        .graduation_year = std.math.maxInt(i16),
    };

    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    const allocator = gpa.allocator();
    defer std.debug.assert(gpa.deinit() == .ok);

    var out: std.Io.Writer.Allocating = .init(allocator);
    try std.json.Stringify.value(user, .{}, &out.writer);
    var arr = out.toArrayList();
    defer arr.deinit(allocator);

    std.debug.print("{s}\n\n\n", .{arr.items});
}
