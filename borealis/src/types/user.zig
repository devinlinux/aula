const Major = @import("major.zig").Major;

pub const User = struct {
    id: usize,
    email: []const u8,
    first_name: []const u8,
    last_name: []const u8,
    major: Major,
    graduation_year: i16,
};
