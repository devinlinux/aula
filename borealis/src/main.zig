const std = @import("std");
const clap = @import("clap.zig");
const User = @import("types/user.zig").User;
const Major = @import("types/major.zig").Major;

pub fn main() !void {
    var args = std.process.args();
    clap.evaluateArgs(&args);
}
