const std = @import("std");
const clap = @import("clap.zig");

pub fn main() !void {
    var args = std.process.args();
    clap.evaluateArgs(&args);
}
