use actix_web::{ get, HttpResponse, Responder };

#[get("/health_check")]
pub async fn health_check() -> impl Responder {
    HttpResponse::Ok()
}

#[cfg(test)]
mod tests {
    #[actix_web::test]
    async fn test_health_check() {
        crate::server::test_spawn();
        let client = reqwest::Client::new();

        let response = client
            .get(&format!("http://127.0.0.1:{}/health_check", crate::server::TEST_PORT))
            .send()
            .await
            .expect("Failed to execute request");

        assert!(response.status().is_success());
        assert_eq!(Some(0), response.content_length());
    }
}
