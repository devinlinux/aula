const std = @import("std");
const borealis = @import("borealis");
const assert = std.debug.assert;

const commands = [6][]const u8 {
    "-h", "--help",
    "-r", "--recover",
    "-n", "--new",
};

pub fn evaluateArgs(args: *std.process.ArgIterator) void {
    _ = args.next();

    while (args.next()) |arg| {
        if (std.mem.eql(u8, "-h", arg) or std.mem.eql(u8, "--help", arg)) {
            help();
        } else if (std.mem.eql(u8, "-r", arg) or std.mem.eql(u8, "--recover", arg)) {

        } else if (std.mem.eql(u8, "-n", arg) or std.mem.eql(u8, "--new", arg)) {

        } else {

        }
    }
}

fn help() void {
    std.debug.print("Borealis {s}\n", .{borealis.VERSION});
    std.debug.print("Commands:\n", .{});
    std.debug.print("-h, --help: print available commands\n", .{});
    std.debug.print("-r, --recover {{dir}}: run using data stored in dir\n", .{});
    std.debug.print("-n, --new {{dir}}: create a new database using dir\n", .{});
}

fn recover() void {

}

fn new() void {

}
