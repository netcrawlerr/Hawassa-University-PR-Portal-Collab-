-- Create the database
CREATE DATABASE IF NOT EXISTS huprportal;


-- Use the database
USE huprportal;

-- Drop tables if they already exist
DROP TABLE IF EXISTS text_reports;
DROP TABLE IF EXISTS goals;
DROP TABLE IF EXISTS users;

-- Create the users table
CREATE TABLE users(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE, -- Make username unique
    password VARCHAR(255) NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL
);

-- Create the goals table
CREATE TABLE goals (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

-- Insert initial goals
INSERT INTO goals (name) VALUES ('1');
INSERT INTO goals (name) VALUES ('2');
INSERT INTO goals (name) VALUES ('3');
INSERT INTO goals (name) VALUES ('4');
INSERT INTO goals (name) VALUES ('5');
INSERT INTO goals (name) VALUES ('6');
INSERT INTO goals (name) VALUES ('7');
INSERT INTO goals (name) VALUES ('8');
INSERT INTO goals (name) VALUES ('9');

-- Create the text_reports table with ON DELETE CASCADE and ON UPDATE CASCADE
CREATE TABLE text_reports (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    goal_id INT NOT NULL,
    username VARCHAR(255) NOT NULL, -- Add username column
    report_details TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (goal_id) REFERENCES goals(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE ON UPDATE CASCADE -- Add foreign key constraint
);

-- Verify the structure of the tables
SHOW TABLES;

-- Verify the foreign key constraints
SHOW CREATE TABLE text_reports;
