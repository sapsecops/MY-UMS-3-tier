-- Create database and role (run as postgres superuser)
-- Adjust passwords and IPs as needed.
CREATE DATABASE "user-account";
CREATE USER student_user WITH ENCRYPTED PASSWORD 'change-me';
GRANT ALL PRIVILEGES ON DATABASE "user-account" TO student_user;
