use diesel;
use diesel::pg::PgConnection;
use diesel::prelude::*;
use chrono::prelude::*;

use crate::schema::{users, tickets, ticket_responses};
use serde_derive::Deserialize;


#[derive(Debug, Queryable, Serialize)]
pub struct User {
    pub id: i32,
    pub email: String,
    pub username: String,
    pub password: String,
    pub created_at: NaiveDateTime,
}

impl User {
    pub fn from_username(conn: &PgConnection, username: String) -> Result<User, diesel::result::Error> {
        users::table
        .filter(users::username.eq(username))
        .first::<User>(conn)
    }
}

#[derive(Debug, Queryable, Serialize)]
pub struct Ticket {
    pub id: i32,
    pub username: String,
    pub name: String,
    pub is_solved: bool,
    pub created_at: NaiveDateTime,
}

impl Ticket {
    pub fn for_user(conn: &PgConnection, username: String) -> Result<Vec<Ticket>, diesel::result::Error> {
        tickets::table
        .filter(users::username.eq(username))
        .inner_join(users::table)
        .select((
            tickets::id,
            users::username,
            tickets::name,
            tickets::is_solved,
            tickets::created_at,
        ))
        .load::<Ticket>(conn)
    }
}

#[derive(Debug, Queryable, Serialize)]
pub struct TicketResponse {
    pub id: i32,
    pub username: String,
    pub text: String,
    pub created_at: NaiveDateTime,
}

#[derive(Debug, Queryable, Serialize)]
pub struct TicketWithResponse {
    pub ticket: Ticket,
    pub responses: Vec<TicketResponse>,
}

impl TicketWithResponse {
    pub fn for_ticket(conn: &PgConnection, username: String, ticket_id: i32) -> Result<TicketWithResponse, diesel::result::Error> {
        let ticket = tickets::table
        .find(ticket_id)
        .filter(users::username.eq(username))
        .inner_join(users::table)
        .select((
            tickets::id,
            users::username,
            tickets::name,
            tickets::is_solved,
            tickets::created_at,
        ))
        .first::<Ticket>(conn)?;

        let responses = ticket_responses::table
        .filter(ticket_responses::ticket_id.eq(ticket.id))
        .inner_join(users::table)
        .select((
            ticket_responses::id,
            users::username,
            ticket_responses::text,
            ticket_responses::created_at,
        ))
        .load::<TicketResponse>(conn)?;

        Ok(TicketWithResponse {
            ticket: ticket,
            responses: responses,
        })
    }
}

#[derive(Deserialize, Insertable)]
#[table_name="users"]
pub struct NewUser {
    pub email: String,
    pub username: String,
    pub password: String,
}

impl NewUser {
    pub fn insert(conn: &PgConnection, user: NewUser) -> Result<usize, diesel::result::Error> {    
        diesel::insert_into(users::table)
            .values(&user)
           .execute(conn)
    }
}

#[derive(Deserialize)]
pub struct Password {
    pub password: String,
}

impl Password {
    pub fn update(&self, conn: &PgConnection, username: String) -> Result<usize, diesel::result::Error> {    
        diesel::update(users::table.filter(users::username.eq(username)))
            .set(users::password.eq(&self.password))
            .execute(conn)
    }
}

#[derive(Insertable)]
#[table_name="ticket_responses"]
pub struct NewTicketResponse {
    pub user_id: i32,
    pub ticket_id: i32,
    pub text: String,
}

impl NewTicketResponse {
    pub fn insert(&self, conn: &PgConnection) -> Result<usize, diesel::result::Error> {    
        diesel::insert_into(ticket_responses::table)
            .values(self)
            .execute(conn)
    }
}