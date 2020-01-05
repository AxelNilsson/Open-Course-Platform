CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR NOT NULL,
  username VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(email),
  UNIQUE(username)
)