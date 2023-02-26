DROP DATABASE IF EXISTS movies_db;
CREATE DATABASE movies_db;

\c movies_db;

CREATE TABLE movie_list (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT DEFAULT 'https://dummyimage.com/300x400/2e022e/d1d3f0&text=No+image+was+found',
    rating DECIMAL DEFAULT 0.0,
    description TEXT
)