DROP TABLE IF EXISTS awards; DROP TABLE IF EXISTS actors;

CREATE TABLE awards (
  id INTEGER PRIMARY KEY,
  year CHAR(4),
  title VARCHAR(255),
  winner_id INTEGER
);

CREATE TABLE actors (
  id INTEGER PRIMARY KEY,
  full_name VARCHAR(255)
);
