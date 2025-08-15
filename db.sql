CREATE DATABASE "user-account";

\c "user-account"

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    course VARCHAR(255) NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    fees_status VARCHAR(50) NOT NULL
);