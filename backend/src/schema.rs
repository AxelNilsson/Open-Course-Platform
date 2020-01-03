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

joinable!(ticket_responses -> tickets (ticket_id));
joinable!(ticket_responses -> users (user_id));
joinable!(tickets -> users (user_id));

allow_tables_to_appear_in_same_query!(
    ticket_responses,
    tickets,
    users,
);
