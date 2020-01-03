table! {
    ticket_responses (id) {
        id -> Unsigned<Bigint>,
        user_id -> Unsigned<Bigint>,
        ticket_id -> Unsigned<Bigint>,
        text -> Text,
        created_at -> Timestamp,
    }
}

table! {
    tickets (id) {
        id -> Unsigned<Bigint>,
        user_id -> Unsigned<Bigint>,
        name -> Varchar,
        is_solved -> Bool,
        created_at -> Timestamp,
    }
}

table! {
    users (id) {
        id -> Unsigned<Bigint>,
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
