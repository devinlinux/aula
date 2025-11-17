use serde::{ Serialize, Deserialize };

#[derive(Serialize, Deserialize)]
pub enum Day {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
}

#[derive(Serialize, Deserialize)]
pub struct Time {
    day: Day,
    hour: u8,
    minute: u8,
}
