const std = @import("std");
const User = @import("../types/user.zig").User;

pub const Borealis = struct {
    memtable: std.HashMap(usize, User),
    read_path: []const u8,
    write_path: []const u8,
};
