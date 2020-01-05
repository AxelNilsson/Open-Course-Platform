table! {
    chapters (id) {
        id -> Int4,
        name -> Varchar,
        slug -> Varchar,
        published -> Bool,
        course_id -> Int4,
        created_at -> Timestamp,
    }
}

table! {
    courses (id) {
        id -> Int4,
        name -> Varchar,
        description -> Text,
        slug -> Varchar,
        image_link -> Nullable<Varchar>,
        published -> Bool,
        created_at -> Timestamp,
        color -> Varchar,
    }
}

table! {
    sessions (id) {
        id -> Int4,
        name -> Varchar,
        slug -> Varchar,
        published -> Bool,
        chapter_id -> Int4,
        session_type -> Int4,
        created_at -> Timestamp,
    }
}

table! {
    sessions_text (id) {
        id -> Int4,
        text -> Varchar,
        session_id -> Int4,
        created_at -> Timestamp,
    }
}

table! {
    ticket_responses (id) {
        id -> Int4,
        user_id -> Int4,
        ticket_id -> Int4,
        text -> Text,
        created_at -> Timestamp,
    }
}

table! {
    tickets (id) {
        id -> Int4,
        user_id -> Int4,
        name -> Varchar,
        is_solved -> Bool,
        created_at -> Timestamp,
    }
}

table! {
    users (id) {
        id -> Int4,
        email -> Varchar,
        username -> Varchar,
        password -> Varchar,
        created_at -> Timestamp,
    }
}

joinable!(chapters -> courses (course_id));
joinable!(sessions -> chapters (chapter_id));
joinable!(sessions_text -> sessions (session_id));
joinable!(ticket_responses -> tickets (ticket_id));
joinable!(ticket_responses -> users (user_id));
joinable!(tickets -> users (user_id));

allow_tables_to_appear_in_same_query!(
    chapters,
    courses,
    sessions,
    sessions_text,
    ticket_responses,
    tickets,
    users,
);
