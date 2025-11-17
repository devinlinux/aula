use std::net::TcpListener;
use std::sync::{ Arc, Mutex };

use actix_web::dev::Server;
use actix_web::{ web, App, HttpServer };

const MAX_SIZE: usize = 4096;

pub struct WebServer;

pub enum ServerMode {
    Genesis,
    Recovery,
}

impl WebServer {
    pub fn run(listener: TcpListener, mode: ServerMode, dir: &str) -> std::io::Result<Server> {
        let num_users = Arc::new(Mutex::new(0usize));

        let server = HttpServer::new(move || {
            App::new()
                .app_data(web::Data::new(num_users.clone()))
                .app_data(web::JsonConfig::default().limit(MAX_SIZE))
                .wrap(
                    actix_cors::Cors::default()
                    .allow_any_origin()
                    .allow_any_method()
                    .allow_any_header()
                    .max_age(3600)
                )
                .service(crate::server::routes::index)
                .service(crate::server::routes::health_check)
                .service(crate::server::routes::register)
        })
        .listen(listener)?.run();

        Ok(server)
    }
}

