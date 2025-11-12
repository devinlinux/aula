use std::path::{ Path, PathBuf };
use std::io::{ BufRead, BufReader, BufWriter, Write };
use crate::data::User;

const DB_FILE: &str = "users.db";

pub struct UserDatabase {
    path: PathBuf,
}

impl UserDatabase {
    pub fn new(dir: &str) -> std::io::Result<UserDatabase> {
        let dir = Path::new(dir);
        if !dir.exists() {
            std::fs::create_dir(dir)?;
        }

        let file_path = dir.join(DB_FILE);
        if file_path.exists() {
            return Err(std::io::Error::new(
                std::io::ErrorKind::AlreadyExists,
                "User database file already exists, refusing to overwrite!",
            ));
        }

        let _ = std::fs::File::create(&file_path)?;

        Ok(Self{ path: file_path })
    }

    pub fn recover(dir: &str) -> std::io::Result<UserDatabase> {
        let dir = Path::new(dir);
        if !dir.exists() {
            return Err(std::io::Error::new(
                std::io::ErrorKind::NotFound,
                "Directory for user database recovery does not exist, aborting!",
            ));
        }

        let file_path = dir.join(DB_FILE);
        if !file_path.exists() {
            return Err(std::io::Error::new(
                std::io::ErrorKind::NotFound,
                "No user database file found for recovery, aborting!",
            ));
        }

        Ok(Self{ path: file_path })
    }

    pub fn add_user(&self, user: User) -> std::io::Result<()> {
        let file = std::fs::OpenOptions::new()
            .write(true)
            .truncate(true)
            .open(&self.path)?;
        let mut writer = BufWriter::new(file);

        let json = serde_json::to_string(&user).map_err(|e| {
            std::io::Error::new(
                std::io::ErrorKind::InvalidData,
                format!("Failed to serialize user: {}",e ),
            )
        })?;
        writeln!(writer, "{}", json)?;
        writer.flush()?;

        Ok(())
    }

    pub fn get_user(&self, id: usize) -> std::io::Result<User> {
        let file = std::fs::File::open(&self.path)?;
        let reader = BufReader::new(file);

        for (i, line) in reader.lines().enumerate() {
            if i != id {
                continue;
            } else {
                let line = line?;
                return Ok(serde_json::from_str(&line)?);
            }
        }

        Err(
            std::io::Error::new(
                std::io::ErrorKind::NotFound,
                "User not found in user database",
            )
        )
    }

    pub fn num_users(&self) -> std::io::Result<usize> {
        let file = std::fs::File::open(&self.path)?;
        let reader = BufReader::new(file);
        Ok(reader.lines().count())
    }
}
