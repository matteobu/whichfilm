import sql from 'better-sqlite3';
const db = sql('film_indie.db');

export function getFilms() {
  return db.prepare('SELECT * FROM film').all();
}
