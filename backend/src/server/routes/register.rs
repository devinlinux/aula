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
    HttpResponse::Ok()
}
