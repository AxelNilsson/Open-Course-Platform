use chrono::prelude::*;
use diesel;
use diesel::pg::PgConnection;
use diesel::prelude::*;

use crate::schema::{chapters, courses, sessions, sessions_text, ticket_responses, tickets, users};
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
    pub fn from_username(
        conn: &PgConnection,
        username: String,
    ) -> Result<User, diesel::result::Error> {
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
    pub fn for_user(
        conn: &PgConnection,
        username: String,
    ) -> Result<Vec<Ticket>, diesel::result::Error> {
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
    pub fn for_ticket(
        conn: &PgConnection,
        username: String,
        ticket_id: i32,
    ) -> Result<TicketWithResponse, diesel::result::Error> {
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
#[table_name = "users"]
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
    pub fn update(
        &self,
        conn: &PgConnection,
        username: String,
    ) -> Result<usize, diesel::result::Error> {
        diesel::update(users::table.filter(users::username.eq(username)))
            .set(users::password.eq(&self.password))
            .execute(conn)
    }
}

#[derive(Insertable)]
#[table_name = "ticket_responses"]
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

#[derive(Debug, Queryable, Serialize)]
pub struct Course {
    pub name: String,
    pub description: String,
    pub slug: String,
    pub image_link: Option<String>,
}

impl Course {
    pub fn all(conn: &PgConnection) -> Result<Vec<Course>, diesel::result::Error> {
        courses::table
            .filter(courses::published.eq(true))
            .select((
                courses::name,
                courses::description,
                courses::slug,
                courses::image_link,
            ))
            .load::<Course>(conn)
    }
}

#[derive(Debug, Queryable, Serialize)]
pub struct Chapter {
    pub name: String,
    pub slug: String,
}

impl Chapter {
    pub fn for_course(
        conn: &PgConnection,
        course: &str,
    ) -> Result<Vec<Chapter>, diesel::result::Error> {
        chapters::table
            .inner_join(courses::table)
            .filter(courses::slug.eq(course))
            .filter(courses::published.eq(true))
            .filter(chapters::published.eq(true))
            .select((chapters::name, chapters::slug))
            .load::<Chapter>(conn)
    }
}

#[derive(Debug, Queryable, Serialize)]
pub struct Session {
    pub name: String,
    pub slug: String,
}

impl Session {
    pub fn for_chapter(
        conn: &PgConnection,
        _course: &str,
        chapter: &str,
    ) -> Result<Vec<Session>, diesel::result::Error> {
        sessions::table
            .inner_join(chapters::table)
            .filter(chapters::slug.eq(chapter))
            .filter(chapters::published.eq(true))
            .filter(sessions::published.eq(true))
            .select((sessions::name, sessions::slug))
            .load::<Session>(conn)
    }
}

#[derive(Debug, Queryable, Serialize)]
pub struct SessionMetaData {
    chapter: String,
    sessions: Vec<String>,
}

#[derive(Debug, Queryable, Serialize)]
pub struct SessionText {
    pub name: String,
    pub text: String,
    pub chapters: Vec<SessionMetaData>,
}

impl SessionText {
    pub fn for_session(
        conn: &PgConnection,
        course: &str,
        _chapter: &str,
        session: &str,
    ) -> Result<SessionText, diesel::result::Error> {
        let (name, text) = sessions_text::table
            .inner_join(sessions::table)
            .filter(sessions::slug.eq(session))
            .filter(sessions::published.eq(true))
            .select((sessions::name, sessions_text::text))
            .first::<(String, String)>(conn)?;

        let chapters = chapters::table
            .inner_join(courses::table)
            .inner_join(sessions::table)
            .filter(courses::slug.eq(course))
            .filter(courses::published.eq(true))
            .filter(chapters::published.eq(true))
            .filter(sessions::published.eq(true))
            .select((chapters::name, sessions::name))
            .load::<(String, String)>(conn)?;

        let mut chapter_name = "".to_string();
        let mut meta_data: Vec<SessionMetaData> = vec![];

        for chapter in chapters {
            if chapter_name == chapter.0 {
                let length = meta_data.len();
                meta_data[length - 1].sessions.push(chapter.1)
            } else {
                chapter_name = chapter.0.clone();
                meta_data.push(SessionMetaData {
                    chapter: chapter.0,
                    sessions: vec![chapter.1],
                })
            }
        }

        return Ok(SessionText {
            name: name,
            text: text,
            chapters: meta_data,
        });
    }
}
