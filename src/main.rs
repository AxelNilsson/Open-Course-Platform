#[macro_use]
extern crate diesel;
#[macro_use]
extern crate serde;
extern crate chrono;

use actix_session::{CookieSession, Session};
use actix_web::{
    http, middleware, web, App, Error, HttpRequest, HttpResponse, HttpServer, Responder,
};
use dotenv::dotenv;
use futures::future::{ready, Ready};
use serde_derive::Serialize;
use std::env;

mod database;
mod models;
mod schema;

use models::{NewTicketResponse, NewUser, Password, Ticket, TicketWithResponse};

async fn update_password(
    item: web::Json<Password>,
    pool: web::Data<database::PgPool>,
    session: Session,
) -> PrettyResponse<String> {
    let mut json = item.into_inner();

    json.password = bcrypt::hash(json.password, bcrypt::DEFAULT_COST).unwrap();
    let username = session.get::<String>("username").unwrap().unwrap();

    let _id = web::block(move || database::update_password(&pool, username, json))
        .await
        .unwrap();

    PrettyResponse {
        data: "Welcome!".to_string(),
        code: 200,
    }
}

async fn create_ticket(_req: HttpRequest) -> PrettyResponse<String> {
    PrettyResponse {
        data: "hej hej".to_string(),
        code: 123,
    }
}

#[derive(Serialize)]
struct TicketResponse {
    user: String,
    text: String,
}

#[derive(Serialize)]
struct TicketsPageData {
    tickets: Vec<Ticket>,
}

async fn tickets(
    pool: web::Data<database::PgPool>,
    session: Session,
) -> Result<PrettyResponse<TicketsPageData>, Error> {
    let username = session.get::<String>("username").unwrap().unwrap();
    let tickets = web::block(move || database::get_all_tickets_for_user(&pool, username)).await?;

    Ok(PrettyResponse {
        data: TicketsPageData { tickets: tickets },
        code: 123,
    })
}

async fn ticket(
    pool: web::Data<database::PgPool>,
    session: Session,
    info: web::Path<i32>,
) -> Result<PrettyResponse<TicketWithResponse>, Error> {
    let username = session.get::<String>("username").unwrap().unwrap();
    let ticket = web::block(move || database::get_ticket(&pool, username, *info)).await?;

    Ok(PrettyResponse {
        data: ticket,
        code: 123,
    })
}

#[derive(Deserialize)]
struct AnswerTicket {
    text: String,
}

async fn answer_ticket(
    pool: web::Data<database::PgPool>,
    session: Session,
    info: web::Path<i32>,
    item: web::Json<AnswerTicket>,
) -> Result<PrettyResponse<String>, Error> {
    println!("In here");

    let json = item.into_inner();
    let username = session.get::<String>("username").unwrap().unwrap();
    let pool_copy = pool.clone();
    let user = web::block(move || database::get_user_with_username(&pool, &username)).await?;
    let new_ticket = NewTicketResponse {
        user_id: user.id,
        ticket_id: *info,
        text: json.text,
    };
    let _ticket = web::block(move || database::answer_ticket(&pool_copy, new_ticket)).await?;

    Ok(PrettyResponse {
        data: "hej".to_string(),
        code: 123,
    })
}

#[derive(Serialize)]
struct Response<T> {
    data: T,
    code: i32,
}

impl<T: serde::Serialize> Responder for Response<T> {
    type Error = Error;
    type Future = Ready<Result<HttpResponse, Error>>;

    fn respond_to(self, _req: &HttpRequest) -> Self::Future {
        let body = serde_json::to_string(&self).unwrap();

        // Create response and set content type
        ready(Ok(HttpResponse::Ok()
            .content_type("application/json")
            .body(body)))
    }
}

#[derive(Serialize)]
struct PrettyResponse<T> {
    data: T,
    code: u16,
}

impl<T: serde::Serialize> Responder for PrettyResponse<T> {
    type Error = Error;
    type Future = Ready<Result<HttpResponse, Error>>;

    fn respond_to(self, _req: &HttpRequest) -> Self::Future {
        let body = serde_json::to_string_pretty(&self).unwrap();

        // Create response and set content type
        ready(Ok(HttpResponse::Ok()
            .content_type("application/json")
            .body(body)))
    }
}

#[derive(Deserialize)]
struct SignInUser {
    username: String,
    password: String,
}

async fn sign_in(
    item: web::Json<SignInUser>,
    pool: web::Data<database::PgPool>,
    session: Session,
) -> PrettyResponse<String> {
    let json = item.into_inner();
    let password = json.password.clone();
    let username = &json.username.clone();
    let user = web::block(move || database::get_user_with_username(&pool, &json.username.clone()))
        .await
        .unwrap();
    if !bcrypt::verify(password, &user.password).unwrap() {
        return PrettyResponse {
            data: "Wrong password!".to_string(),
            code: 400,
        };
    }
    session.set("username", username).unwrap();

    PrettyResponse {
        data: "Welcome!".to_string(),
        code: 200,
    }
}

async fn sign_up(
    item: web::Json<NewUser>,
    pool: web::Data<database::PgPool>,
    session: Session,
) -> PrettyResponse<String> {
    let mut json = item.into_inner();

    let username = &json.username.clone();
    json.password = bcrypt::hash(json.password, bcrypt::DEFAULT_COST).unwrap();

    let _id = web::block(move || database::insert_new_user(&pool, json))
        .await
        .unwrap();
    session.set("username", username).unwrap();

    PrettyResponse {
        data: "Welcome!".to_string(),
        code: 200,
    }
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    env::set_var("RUST_LOG", "actix_todo=debug,actix_web=info");
    env_logger::init();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let pool = database::init_pool(&database_url).expect("Failed to create pool");

    let app = move || {
        App::new()
            .data(pool.clone())
            .wrap(middleware::Logger::default())
            .wrap(CookieSession::signed(&[0; 32]).secure(false))
            .service(web::resource("/sign/up").route(web::method(http::Method::POST).to(sign_up)))
            .service(web::resource("/sign/in").route(web::method(http::Method::POST).to(sign_in)))
            .service(web::resource("/tickets").route(web::method(http::Method::GET).to(tickets)))
            .service(
                web::resource("/tickets/create")
                    .route(web::method(http::Method::POST).to(create_ticket)),
            )
            .service(
                web::resource("/tickets/{ticket}")
                    .route(web::method(http::Method::GET).to(ticket))
                    .route(web::method(http::Method::POST).to(answer_ticket)),
            )
            .service(
                web::resource("/password/update")
                    .route(web::method(http::Method::POST).to(update_password)),
            )
    };
    HttpServer::new(app).bind("0.0.0.0:8080")?.run().await
}
