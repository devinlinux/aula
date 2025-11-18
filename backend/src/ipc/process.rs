use tokio::sync::{ mpsc, oneshot };
use std::sync::Arc;

pub struct ProcessManager {
    pub tx: mpsc::Sender<ProcessCommand>,
}

pub struct ProcessCommand {
    pub command: String,
    pub response_to: oneshot::Sender<String>,
}
