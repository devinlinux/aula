const std = @import("std");
const borealis = @import("borealis");
const assert = std.debug.assert;
const Borealis = @import("internals/db.zig").Borealis;
const Mode = @import("internals/db.zig").Mode;

const commands = [_][]const u8 {
    "-h", "--help",
    "-v", "--version",
    "-r", "--recover",
    "-n", "--new",
};

pub fn evaluateArgs(args: *std.process.ArgIterator) void {
    _ = args.next();

    while (args.next()) |arg| {
        if (std.mem.eql(u8, "-h", arg) or std.mem.eql(u8, "--help", arg)) {
            help();
        } else if (std.mem.eql(u8, "-v", arg) or std.mem.eql(u8, "--version", arg)) {
            version();
        } else if (std.mem.eql(u8, "-r", arg) or std.mem.eql(u8, "--recover", arg)) {
            const dir = args.next();
            if (dir == null) {
                std.debug.print("Expected directory argument for recover command\n", .{});
                std.process.exit(1);
            }

            recover(dir.?);
        } else if (std.mem.eql(u8, "-n", arg) or std.mem.eql(u8, "--new", arg)) {
            const dir = args.next();
            if (dir == null) {
                std.debug.print("Expected directory argument for new command\n", .{});
                std.process.exit(1);
            }

            new(dir.?);
        } else {
            notFound();
            std.process.exit(1);
        }
    }
}

fn help() void {
    std.debug.print("Borealis {s}\n", .{borealis.VERSION});
    std.debug.print("Commands:\n", .{});
    std.debug.print("-h, --help: print available commands\n", .{});
    std.debug.print("-v, --version: display the version\n", .{});
    std.debug.print("-r, --recover {{dir}}: run using data stored in dir\n", .{});
    std.debug.print("-n, --new {{dir}}: create a new database using dir\n", .{});
}

fn version() void {
    std.debug.print("Borealis {s}\n", .{borealis.VERSION});
}

fn recover(dir: []const u8) void {
    _ = Borealis.init(dir, Mode.recover);
}

fn new(dir: []const u8) void {
    _ = Borealis.init(dir, Mode.new);
}

fn notFound() void {
    std.debug.print("Command not found, use -h or --help for a list\n", .{});
}
