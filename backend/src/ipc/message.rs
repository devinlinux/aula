use serde::{ Serialize, Deserialize };

#[derive(Serialize, Deserialize)]
pub enum Result {
    Success,
    Failure,
}

#[derive(Serialize, Deserialize)]
pub struct Message {
    result: Result,
    message: String,
}
