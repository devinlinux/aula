use actix_web::{ post, web, HttpResponse, HttpRequest, Responder };
use serde::{ Serialize, Deserialize };
use crate::data::{ Major, User };

#[derive(Serialize, Deserialize)]
struct RegisterData {
    email: String,
    first_name: String,
    last_name: String,
    major: Major,
    graduation_year: i16,
}

impl Into<User> for RegisterData {
    fn into(self) -> User {
        User::new(self.email, self.first_name, self.last_name, self.major, self.graduation_year)
    }
}

#[post("/pre-register")]
pub async fn register(data: web::Json<RegisterData>, req: HttpRequest) -> impl Responder {
    HttpResponse::Ok().body("Registration Successful")
}
