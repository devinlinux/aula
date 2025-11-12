const std = @import("std");
const clap = @import("clap.zig");

pub fn main() !void {
    std.debug.print("Welcome to Borealis...\n", .{});

    var args = std.process.args();
    clap.evaluateArgs(&args);
}
