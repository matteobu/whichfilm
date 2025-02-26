import Database from 'better-sqlite3';
const db = new Database('../film_indie.db');
import CFF_ALL from '../jsonFiles/CFF_ALL.json' assert { type: 'json' };

const awardFilms = CFF_ALL;
// const awardFilms = CFF_GRAND_PRIX_FILMS_WINNERS;

awardFilms.forEach((film) => {
  try {
    const filmExists = db
      .prepare('SELECT 1 FROM film WHERE tmbd_id = ?')
      .get(film.id);

    if (filmExists) {
      console.log(`Film with tmbd_id ${film.id} already exists.`);
    } else {
      const filmInsert = db.prepare(`
        INSERT INTO film (tmbd_id, title, backdrop_path, release_date, overview, runtime, genres, festival_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      filmInsert.run(
        film.id,
        film.title,
        film.backdrop_path,
        film.release_date,
        film.overview,
        film.runtime,
        film.genres,
        987654
      );
      console.log(`Film inserted: ${film.title}`);
    }
  } catch (error) {
    console.error(`Error processing film: ${film.title}`, error);
  }
});

console.log('✅ All films processed.');
