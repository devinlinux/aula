use crate::data::Major;
use serde::{ Serialize, Deserialize };

#[derive(Serialize, Deserialize)]
pub struct User {
    id: u64,
    email: String,
    first_name: String,
    last_name: String,
    //  PROFILE PICTURE -> UUID + format auto convert?
    major: Major,
    graduation_year: i16,
}

impl User {
    pub fn new(email: String, first_name: String, last_name: String, major: Major, graduation_year: i16) -> User {
        Self {
            id: 0,
            email,
            first_name,
            last_name,
            major,
            graduation_year,
        }
    }
}
