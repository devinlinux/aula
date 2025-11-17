pub const Result = enum {
    success,
    failure,
};

pub const Message = struct {
    result: Result,
    message: []const u8,
};
