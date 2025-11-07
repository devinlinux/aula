use crate::data::Major;

pub struct User {
    id: u64,
    first_name: String,
    last_name: String,
    //  PROFILE PICTURE -> UUID + format auto convert?
    major: Major,
    graduation_year: i16,
}
