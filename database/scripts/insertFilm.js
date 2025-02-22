import Database from 'better-sqlite3';
const db = new Database('../film_indie.db');
import CFF_GRAND_PRIX_FILMS_WINNERS from '../jsonFiles/CFF_GRAND_PRIX_FILMS_WINNERS.json' assert { type: 'json' };
import CFF_PALME_DOR_FILMS_WINNERS from '../jsonFiles/CFF_PALME_DOR_FILMS_WINNERS.json' assert { type: 'json' };

const awardFilms = CFF_PALME_DOR_FILMS_WINNERS;
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
        INSERT INTO film (tmbd_id, title, backdrop_path, release_date, overview, runtime, festival_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      filmInsert.run(
        film.id,
        film.title,
        film.backdrop_path,
        film.release_date,
        film.overview,
        film.runtime,
        987654
      );
      console.log(`Film inserted: ${film.title}`);
    }
  } catch (error) {
    console.error(`Error processing film: ${film.title}`, error);
  }
});

console.log('✅ All films processed.');
