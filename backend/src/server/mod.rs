mod routes;

mod server;

pub use server::WebServer;
pub use server::ServerMode;

pub(super) const TEST_PORT: u16 = 8081;

#[cfg(test)]
pub(super) fn test_spawn() {
    let listener = std::net::TcpListener::bind(format!("127.0.0.1:{}", TEST_PORT))
        .expect("Failed to bind to port 8081, may be in use");

    let server = WebServer::run(listener, ServerMode::Genesis).expect("Failed to bind address");

    let _ = tokio::spawn(server);
}
