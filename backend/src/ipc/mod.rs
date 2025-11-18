mod process;
mod message;

use std::sync::Arc;

use tokio::io::{ AsyncWriteExt, AsyncBufReadExt, BufReader };
use tokio::process::{ Command, ChildStdin, ChildStdout };
use tokio::sync::mpsc;
use crate::server::ServerMode;

pub use message::{ Message, Result };
pub use process::{ ProcessManager, ProcessCommand };

const BOREALIS_PATH: &str = "../borealis/zig-out/bin/borealis";

pub async fn spawn_process_manager(mode: ServerMode, dir: &str) -> anyhow::Result<Arc<ProcessManager>> {
    let argument = match mode {
        ServerMode::Genesis => "-n",
        ServerMode::Recovery=> "-r",
    };

    let mut child = Command::new(BOREALIS_PATH)
        .arg(argument)
        .arg(dir)
        .stdin(std::process::Stdio::piped())
        .stdout(std::process::Stdio::piped())
        .spawn()?;

    let mut stdin = child.stdin.take().expect("no stdin");
    let stdout = child.stdout.take().expect("no stdout");

    let mut stdout_reader = BufReader::new(stdout);

    let (tx, mut rx) = mpsc::channel::<ProcessCommand>(32);

    tokio::spawn(async move {
    });

    Ok(Arc::new(ProcessManager { tx }))
}
