const Database = require('better-sqlite3');
const db = new Database('film_indie.db');

// Create Film Table
db.prepare(
  `
    CREATE TABLE IF NOT EXISTS film (
        tmbd_id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        backdrop_path TEXT,
        release_date TEXT,
        overview TEXT,
        runtime INTEGER
    )
`
).run();

// Create Director Table
db.prepare(
  `
    CREATE TABLE IF NOT EXISTS director (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL
    )
`
).run();

// Create Film-Director Relationship Table
db.prepare(
  `
    CREATE TABLE IF NOT EXISTS film_director (
        film_id INTEGER,
        director_id INTEGER,
        PRIMARY KEY (film_id, director_id),
        FOREIGN KEY (film_id) REFERENCES film (tmbd_id),
        FOREIGN KEY (director_id) REFERENCES director (id)
    )
`
).run();

// Create Actor Table
db.prepare(
  `
    CREATE TABLE IF NOT EXISTS actor (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL
    )
`
).run();

// Create Film-Actor Relationship Table
db.prepare(
  `
    CREATE TABLE IF NOT EXISTS film_actor (
        film_id INTEGER,
        actor_id INTEGER,
        PRIMARY KEY (film_id, actor_id),
        FOREIGN KEY (film_id) REFERENCES film (tmbd_id),
        FOREIGN KEY (actor_id) REFERENCES actor (id)
    )
`
).run();

// Create Genre Table
db.prepare(
  `
    CREATE TABLE IF NOT EXISTS genre (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL
    )
`
).run();

// Create Film-Genre Relationship Table
db.prepare(
  `
    CREATE TABLE IF NOT EXISTS film_genre (
        film_id INTEGER,
        genre_id INTEGER,
        PRIMARY KEY (film_id, genre_id),
        FOREIGN KEY (film_id) REFERENCES film (tmbd_id),
        FOREIGN KEY (genre_id) REFERENCES genre (id)
    )
`
).run();

// Create Language Table
db.prepare(
  `
    CREATE TABLE IF NOT EXISTS language (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL
    )
`
).run();

// Create Film-Language Relationship Table
db.prepare(
  `
    CREATE TABLE IF NOT EXISTS film_language (
        film_id INTEGER,
        language_id INTEGER,
        PRIMARY KEY (film_id, language_id),
        FOREIGN KEY (film_id) REFERENCES film (tmbd_id),
        FOREIGN KEY (language_id) REFERENCES language (id)
    )
`
).run();

// Create Film Festival Table
db.prepare(
  `
    CREATE TABLE IF NOT EXISTS festival (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        location TEXT,
        start_date TEXT,
        end_date TEXT
    )
`
).run();

// Create Film-Festival Relationship Table
db.prepare(
  `
    CREATE TABLE IF NOT EXISTS film_festival (
        film_id INTEGER,
        festival_id INTEGER,
        award TEXT,
        PRIMARY KEY (film_id, festival_id),
        FOREIGN KEY (film_id) REFERENCES film (tmbd_id),
        FOREIGN KEY (festival_id) REFERENCES festival (id)
    )
`
).run();

