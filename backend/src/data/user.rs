use crate::data::Major;
use serde::{ Serialize, Deserialize };

#[derive(Serialize, Deserialize)]
pub struct User {
    id: usize,
    email: String,
    first_name: String,
    last_name: String,
    //  PROFILE PICTURE -> UUID + format auto convert?
    major: Major,
    graduation_year: i16,
}

impl User {
    pub fn new(id: usize, email: String, first_name: String, last_name: String, major: Major, graduation_year: i16) -> User {
        Self {
            id,
            email,
            first_name,
            last_name,
            major,
            graduation_year,
        }
    }
}
