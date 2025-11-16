const std = @import("std");

const MAX_STRING_SIZE = 17;

pub const Day = enum {
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,

    pub fn toString(self: Day) []const u8 {
        return switch (self) {
            .monday => "Monday",
            .tuesday => "Tuseday",
            .wednesday => "Wednesday",
            .thursday => "Thursday",
            .friday => "Friday",
            .saturday => "Saturday",
            .sunday => "Sunday",
        };
    }
};

pub const Time = struct {
    day: Day,
    hour: u8,
    minute: u8,

    pub fn toString(self: Time) []const u8 {
        var buffer: [MAX_STRING_SIZE]u8 = undefined;
        return std.fmt.bufPrint(&buffer, "{s} {d}:{d}", .{ self.day.toString(), self.hour, self.minute }) catch |err| {
            std.debug.print("Error creating string for day: {}\n", .{err});
            std.process.exit(1);
        };
    }
};
