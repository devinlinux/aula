use core::num;
use std::sync::{ Arc, Mutex };

use actix_web::{ post, web, HttpResponse, HttpRequest, Responder };
use serde::{ Serialize, Deserialize };

use crate::data::{ Major, User };
use crate::db::UserDatabase;

#[derive(Serialize, Deserialize)]
struct RegisterData {
    email: String,
    first_name: String,
    last_name: String,
    major: Major,
    graduation_year: i16,
}

#[post("/register")]
pub async fn register(db: web::Data<Arc<Mutex<UserDatabase>>>, num_users: web::Data<Arc<Mutex<usize>>>, data: web::Json<RegisterData>, req: HttpRequest) -> impl Responder {
    let db = db.lock().unwrap();
    let mut count = num_users.lock().unwrap();

    db.add_user(User::new(*count, data.email.clone(), data.first_name.clone(), data.last_name.clone(), data.major, data.graduation_year)).map_err(|e| {
        return HttpResponse::InternalServerError().body(format!("Error: {}", e))
    }).unwrap();
    *count += 1;

    HttpResponse::Ok()
}
