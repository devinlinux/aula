use serde::{ Serialize, Deserialize };
use crate::data::Major;
use super::StrippedGroup;

#[derive(Serialize, Deserialize)]
pub struct User {
    id: usize,
    email: String,
    password: String,
    first_name: String,
    last_name: String,
    major: Major,
    graduation_year: i16,
    groups: Vec<StrippedGroup>,
}

#[derive(Serialize, Deserialize)]
pub struct StrippedUser {
    id: usize,
    full_name: String,
}
