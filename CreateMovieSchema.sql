

CREATE SCHEMA movie_db;

USE movie_db;

DROP TABLE IF EXISTS movie_genre;
DROP TABLE IF EXISTS movie_actor;
DROP TABLE IF EXISTS movie;
DROP TABLE IF EXISTS director;
DROP TABLE IF EXISTS review;
DROP TABLE IF EXISTS supplementary_data;
DROP TABLE IF EXISTS genre;
DROP TABLE IF EXISTS actor;
DROP TABLE IF EXISTS full_top_movies;
DROP TABLE IF EXISTS full_supp;

CREATE TABLE director (
    director_id INT AUTO_INCREMENT PRIMARY KEY,
    director_name VARCHAR(45)
);

CREATE TABLE review (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    imdb_rating FLOAT,
    imdb_metascore INT
);

CREATE TABLE supplementary_data (
    data_id INT AUTO_INCREMENT PRIMARY KEY,
    og_language VARCHAR(45),
    budget FLOAT
);

CREATE TABLE movie (
    movie_id INT AUTO_INCREMENT,
    title VARCHAR(45),
    release_year INT,
    runtime_min INT,
    gross FLOAT,
    director_id INT,
    review_id INT,
    data_id INT,
    PRIMARY KEY (movie_id, release_year),
    FOREIGN KEY (director_id) REFERENCES director(director_id),
    FOREIGN KEY (review_id) REFERENCES review(review_id),
    FOREIGN KEY (data_id) REFERENCES supplementary_data(data_id)
);

CREATE TABLE genre (
    genre_id INT AUTO_INCREMENT PRIMARY KEY,
    genre_name VARCHAR(45)
);

CREATE TABLE actor (
    actor_id INT AUTO_INCREMENT PRIMARY KEY,
    actor_name VARCHAR(45)
);

CREATE TABLE movie_genre (
    movie_id INT,
    genre_id INT,
    PRIMARY KEY (movie_id, genre_id),
    FOREIGN KEY (movie_id) REFERENCES movie(movie_id),
    FOREIGN KEY (genre_id) REFERENCES genre(genre_id)
);

CREATE TABLE movie_actor (
    actor_id INT,
    movie_id INT,
    character_name VARCHAR(45),
    PRIMARY KEY (actor_id, movie_id),
    FOREIGN KEY (actor_id) REFERENCES actor(actor_id),
    FOREIGN KEY (movie_id) REFERENCES movie(movie_id)
);

CREATE TABLE full_top_movies (
	id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(45),
    director VARCHAR(45),
    release_year INT,
    runtime INT,
    genre VARCHAR(45),
    rating FLOAT,
    metascore INT,
    gross_M FLOAT
);

CREATE TABLE full_supp (
	id INT AUTO_INCREMENT PRIMARY KEY,
    names VARCHAR(45),
    actor VARCHAR(45),
    character_name VARCHAR(45),
    orig_lang VARCHAR(45),
    budget_x FLOAT
);