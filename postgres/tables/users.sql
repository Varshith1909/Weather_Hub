BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email text UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

COMMIT;