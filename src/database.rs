use std::ops::Deref;

use diesel::mysql::MysqlConnection;
use diesel::r2d2::{ConnectionManager, Pool, PoolError, PooledConnection};

use crate::models::{Password, NewUser, User, Ticket, TicketWithResponse, NewTicketResponse};

pub type MySQLPool = Pool<ConnectionManager<MysqlConnection>>;
type MySQLPooledConnection = PooledConnection<ConnectionManager<MysqlConnection>>;

pub fn init_pool(database_url: &str) -> Result<MySQLPool, PoolError> {
    let manager = ConnectionManager::<MysqlConnection>::new(database_url);
    Pool::builder().build(manager)
}

fn get_conn(pool: &MySQLPool) -> Result<MySQLPooledConnection, &'static str> {
    pool.get().map_err(|_| "Can't get connection")
}

pub fn get_user_with_username(pool: &MySQLPool, username: &str) -> Result<User, &'static str> {
    User::from_username(get_conn(pool)?.deref(), username.to_string()).map_err(|_| "Error getting user")
}

pub fn get_all_tickets_for_user(pool: &MySQLPool, username: String) -> Result<Vec<Ticket>, &'static str> {
    Ticket::for_user(get_conn(pool)?.deref(), username).map_err(|_| "Error getting user")
}

pub fn get_ticket(pool: &MySQLPool, username: String, ticket_id: u64) -> Result<TicketWithResponse, &'static str> {
    TicketWithResponse::for_ticket(get_conn(pool)?.deref(), username, ticket_id).map_err(|_| "Error getting user")
}

pub fn insert_new_user(pool: &MySQLPool, user: NewUser) -> Result<usize, &'static str> {
    NewUser::insert(get_conn(pool)?.deref(), user).map_err(|_| "Error getting user")
}

pub fn update_password(pool: &MySQLPool, username: String, password: Password) -> Result<usize, &'static str> {
    password.update(get_conn(pool)?.deref(), username).map_err(|_| "Error getting user")
}

pub fn answer_ticket(pool: &MySQLPool, ticket: NewTicketResponse) -> Result<usize, &'static str> {
    ticket.insert(get_conn(pool)?.deref()).map_err(|_| "Error getting user")
}