use std::net::TcpListener;
use std::sync::{ Arc, Mutex };

use actix_web::dev::Server;
use actix_web::{ web, App, HttpServer };

const USER_COUNT_FILE: &str = "user_count.dat";
const GROUP_COUNT_FILE: &str = "group_count.dat";
const MAX_SIZE: usize = 4096;

pub struct WebServer;

pub enum ServerMode {
    Genesis,
    Recovery,
}

impl WebServer {
    pub fn run(listener: TcpListener, mode: ServerMode, dir: &str) -> std::io::Result<Server> {
        let dir = dir.to_string();

        let num_users = match mode {
            ServerMode::Genesis => Arc::new(Mutex::new(0usize)),
            ServerMode::Recovery => Arc::new(Mutex::new(read_num(&dir, true)?)),
        };

        let num_groups = match mode {
            ServerMode::Genesis => Arc::new(Mutex::new(0usize)),
            ServerMode::Recovery => Arc::new(Mutex::new(read_num(&dir, false)?)),
        };

        let dir_for_shutdown = dir.clone();
        let users_for_shutdown = num_users.clone();
        let groups_for_shutdown = num_groups.clone();

        let server = HttpServer::new(move || {
            App::new()
                .app_data(web::Data::new(num_users.clone()))
                .app_data(web::Data::new(num_groups.clone()))
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

        let server_handle = server.handle();

        actix_rt::spawn(async move {
            tokio::signal::ctrl_c()
                .await
                .expect("Failed to install CTRL+C handler");

            println!("Server shutting down, saving counters...");

            let users = *users_for_shutdown.lock().unwrap();
            let groups = *groups_for_shutdown.lock().unwrap();

            println!("Users: {}, Groups: {}", users, groups);

            if let Err(e) = write_num(&dir_for_shutdown, users, true) {
                eprintln!("Failed to save user count: {}", e);
            }
            if let Err(e) = write_num(&dir_for_shutdown, groups, false) {
                eprintln!("Failed to save group count: {}", e);
            }

            server_handle.stop(false).await;
        });

        Ok(server)
    }
}

fn read_num(dir: &str, users: bool) -> std::io::Result<usize> {
    let file = if users { USER_COUNT_FILE } else { GROUP_COUNT_FILE };
    let contents = std::fs::read_to_string(format!("{}/{}", dir, file))?;
    let num = contents.trim().parse::<usize>()
        .map_err(|e| std::io::Error::new(std::io::ErrorKind::InvalidData, e))?;
    Ok(num)
}

fn write_num(dir: &str, num: usize, users: bool) -> std::io::Result<()> {
    let file = if users { USER_COUNT_FILE } else { GROUP_COUNT_FILE };
    std::fs::write(format!("{}/{}", dir, file), num.to_string())?;
    Ok(())
}
