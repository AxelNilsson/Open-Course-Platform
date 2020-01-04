CREATE TABLE sessions_text (
  id SERIAL PRIMARY KEY NOT NULL,
  text VARCHAR NOT NULL,
  session_id INTEGER NOT NULL REFERENCES sessions (id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(session_id)
)