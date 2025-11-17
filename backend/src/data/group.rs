use serde::{ Serialize, Deserialize };
use super::StrippedUser;
use super::Time;

#[derive(Serialize, Deserialize)]
pub struct Group {
    id: usize,
    name: String,
    members: Vec<StrippedUser>,
    times: Vec<Time>,
}

#[derive(Serialize, Deserialize)]
pub struct StrippedGroup {
    id: usize,
    name: String,
}
