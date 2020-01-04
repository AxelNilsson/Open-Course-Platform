use std::ops::Deref;

use diesel::pg::PgConnection;
use diesel::r2d2::{ConnectionManager, Pool, PoolError, PooledConnection};

use crate::models::{SessionText, Session, Chapter, Course, Password, NewUser, User, Ticket, TicketWithResponse, NewTicketResponse};

pub type PgPool = Pool<ConnectionManager<PgConnection>>;
type PgPooledConnection = PooledConnection<ConnectionManager<PgConnection>>;

pub fn init_pool(database_url: &str) -> Result<PgPool, PoolError> {
    let manager = ConnectionManager::<PgConnection>::new(database_url);
    Pool::builder().build(manager)
}

fn get_conn(pool: &PgPool) -> Result<PgPooledConnection, &'static str> {
    pool.get().map_err(|_| "Can't get connection")
}

pub fn get_user_with_username(pool: &PgPool, username: &str) -> Result<User, &'static str> {
    User::from_username(get_conn(pool)?.deref(), username.to_string()).map_err(|_| "Error getting user")
}

pub fn get_all_tickets_for_user(pool: &PgPool, username: String) -> Result<Vec<Ticket>, &'static str> {
    Ticket::for_user(get_conn(pool)?.deref(), username).map_err(|_| "Error getting user")
}

pub fn get_ticket(pool: &PgPool, username: String, ticket_id: i32) -> Result<TicketWithResponse, &'static str> {
    TicketWithResponse::for_ticket(get_conn(pool)?.deref(), username, ticket_id).map_err(|_| "Error getting user")
}

pub fn insert_new_user(pool: &PgPool, user: NewUser) -> Result<usize, &'static str> {
    NewUser::insert(get_conn(pool)?.deref(), user).map_err(|_| "Error getting user")
}

pub fn update_password(pool: &PgPool, username: String, password: Password) -> Result<usize, &'static str> {
    password.update(get_conn(pool)?.deref(), username).map_err(|_| "Error getting user")
}

pub fn answer_ticket(pool: &PgPool, ticket: NewTicketResponse) -> Result<usize, &'static str> {
    ticket.insert(get_conn(pool)?.deref()).map_err(|_| "Error getting user")
}

pub fn get_all_courses(pool: &PgPool) -> Result<Vec<Course>, &'static str> {
    Course::all(get_conn(pool)?.deref()).map_err(|_| "Error getting user")
}

pub fn get_all_chapters_for_course(pool: &PgPool, course: &str) -> Result<Vec<Chapter>, &'static str> {
    Chapter::for_course(get_conn(pool)?.deref(), course).map_err(|_| "Error getting user")
}

pub fn get_all_sessions_for_chapter(pool: &PgPool, course: &str, chapter: &str) -> Result<Vec<Session>, &'static str> {
    Session::for_chapter(get_conn(pool)?.deref(), course, chapter).map_err(|_| "Error getting user")
}

pub fn get_session_text_for_session(pool: &PgPool, course: &str, chapter: &str, session: &str) -> Result<SessionText, &'static str> {
    SessionText::for_session(get_conn(pool)?.deref(), course, chapter, session).map_err(|_| "Error getting user")
}