use std::net::TcpListener;
use std::sync::{ Arc, Mutex };

use actix_web::dev::Server;
use actix_web::{ web, App, HttpServer };

use crate::db::UserDatabase;

const MAX_SIZE: usize = 4096;

pub struct WebServer;

pub enum ServerMode {
    Genesis,
    Recovery,
}

impl WebServer {
    pub fn run(listener: TcpListener, mode: ServerMode, dir: &str) -> std::io::Result<Server> {
        let user_db = match mode {
            ServerMode::Genesis => {
                UserDatabase::new(dir)?
            },
            ServerMode::Recovery => {
                UserDatabase::recover(dir)?
            },
        };

        let user_db = Arc::new(Mutex::new(user_db));

        let server = HttpServer::new(move || {
            App::new()
                .app_data(web::Data::new(user_db.clone()))
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
        })
        .listen(listener)?.run();

        Ok(server)
    }
}

