import { OramaSearchHitDocument, OramaSearchHits } from './types';
import { SearchRandomType } from '../utils/types';
import { FESTIVAL_NAMES, N_FILMS_TO_DISPLAY } from '../utils/constants';
import filmFetched from '../database/jsonFiles/filmFetched.json';

/**
 * Generates a deterministically random subset of film objects based on the current date
 * This ensures the same set of random films is returned on a given day
 *
 * @param response - Array of search result objects from Orama
 * @param num - Number of random items to return
 * @returns A subset of randomly selected items of specified length
 */
export function getRandomObjects(
  response: OramaSearchHits[],
  num: number
): OramaSearchHits[] {
  const arrayCopy = [...response];
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth();
  const dayNumber = today.getDate();

  // Create a seed based on current date for deterministic randomness
  const seed = year * 1000 + month * 31 + dayNumber;

  // Fisher-Yates shuffle algorithm with deterministic randomization
  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const j = (i + seed) % (i + 1);
    [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
  }

  return arrayCopy.slice(0, num) as unknown as OramaSearchHits[];
}

/**
 * Finds film IDs by matching titles in a dataset
 *
 * @param filteredTitles - Array of film titles to look up
 * @param filmData - Collection of film objects to search within
 * @returns Promise resolving to an array of film IDs that match the provided titles
 */
export async function getFilmIdsByTitle(filteredTitles, filmData) {
  return filteredTitles
    .map((title: string) => {
      const film = filmData.find(
        (f) => f.title.toLowerCase() === title.toLowerCase()
      );
      return film ? film.id : null;
    })
    .filter((id: number) => id !== null);
}

/**
 * Extracts all unique genres from a collection of films
 *
 * @param results - Search results containing film documents
 * @returns Array of unique genre strings across all films
 */
export function getUniqueGenres(results) {
  return Array.from(
    new Set(results.hits.flatMap((film) => film.document.genres || []))
  );
}

export const getRandomFilms = (films: any[], count: number) => {
  const randomFilms = [];
  const seenIndices = new Set();
  while (randomFilms.length < count && films.length > 0) {
    const randomIndex = Math.floor(Math.random() * films.length);
    if (!seenIndices.has(randomIndex)) {
      randomFilms.push(films[randomIndex]);
      seenIndices.add(randomIndex);
    }
  }
  return randomFilms;
};

export const isDifferentDay = (storedTimestamp, currentTimestamp) => {
  const storedDate = new Date(storedTimestamp);
  const currentDate = new Date(currentTimestamp);
  return (
    storedDate.getUTCFullYear() !== currentDate.getUTCFullYear() ||
    storedDate.getUTCMonth() !== currentDate.getUTCMonth() ||
    storedDate.getUTCDate() !== currentDate.getUTCDate()
  );
};

export const getInfoForLocalStorage = () => {
  const storedRandomFilms = localStorage.getItem('storedRandomFilms');
  const storedRandomBestOverall = localStorage.getItem(
    'storedRandomBestOverall'
  );
  const storedRandomBestFFFilm = localStorage.getItem('storedRandomBestFFFilm');
  const randomFestivalName = localStorage.getItem('randomFestivalName');

  const storedTimestamp = localStorage.getItem('filmsTimestamp');
  const currentTime = new Date().getTime();
  return {
    storedRandomFilms,
    storedRandomBestOverall,
    storedRandomBestFFFilm,
    randomFestivalName,
    storedTimestamp,
    currentTime,
  };
};

export async function extractAndVerifySimilarTitles(
  text: string,
  originalTitle: string
) {
  const regex = /"([^"]+)"/g;
  const possibleTitles = [...text.matchAll(regex)].map((match) => match[1]); // Extracts the film titles

  const cleanedTitles = possibleTitles.map((title) =>
    title.replace(/[.,!?;]$/, '').trim()
  );

  const filteredTitles = [...new Set(cleanedTitles)].filter(
    (title) => title !== originalTitle
  );

  return filteredTitles;
}

export const getGenresYearsLanguages = (films: OramaSearchHitDocument[]) => {
  const genres = new Set<string>();
  const years = new Set<number>();
  const languages = new Set<string>();

  films.forEach((film) => {
    film.genres.forEach((genre) => genres.add(genre));
    years.add(Number(film.release_date.split('-')[0]));
    film.spoken_languages.flat().forEach((language) => languages.add(language));
  });

  return {
    genres: Array.from(genres),
    years: Array.from(years).sort((a, b) => b - a),
    languages: Array.from(languages),
  };
};

export const fetchFilms = async (
  type: SearchRandomType,
  setFilmsToDisplay: Function,
  setRandomFilmFestival: Function
) => {
  const _filmFetchedFiltered = filmFetched.filter(
    (film) =>
      film.infoIndieAndAwards &&
      film.infoIndieAndAwards.notStrictIndie === false &&
      film.backdrop_path !== null &&
      film.poster_path !== null
  );
  const actualDate = new Date().getTime().toString();
  localStorage.setItem('filmsTimestamp', actualDate);

  switch (type) {
    case SearchRandomType.RANDOM:
      const _RANDOM_FILMS = getRandomFilms(
        _filmFetchedFiltered,
        N_FILMS_TO_DISPLAY
      );
      localStorage.setItem('storedRandomFilms', JSON.stringify(_RANDOM_FILMS));
      setFilmsToDisplay((prev: any) => ({
        ...prev,
        randomFilms: _RANDOM_FILMS,
      }));
      break;

    case SearchRandomType.BEST_OF_FF:
      const festivalNames = Object.values(FESTIVAL_NAMES);
      const randomFestival =
        festivalNames[Math.floor(Math.random() * festivalNames.length)];
      setRandomFilmFestival(randomFestival);
      localStorage.setItem(
        'randomFestivalName',
        JSON.stringify(randomFestival)
      );
      const filteredFilms = _filmFetchedFiltered.filter(
        (film) => film.infoIndieAndAwards[randomFestival.toLowerCase()]
      );
      const _RANDOM_OVERALL_FF_FILMS = getRandomFilms(
        filteredFilms.sort((a, b) => b.vote_average - a.vote_average),
        N_FILMS_TO_DISPLAY
      );
      localStorage.setItem(
        'storedRandomBestFFFilm',
        JSON.stringify(_RANDOM_OVERALL_FF_FILMS)
      );
      setFilmsToDisplay((prev: any) => ({
        ...prev,
        bestFFFilms: _RANDOM_OVERALL_FF_FILMS,
      }));
      break;

    case SearchRandomType.OVERALL:
      const sortedFilms = _filmFetchedFiltered.sort(
        (a, b) => b.vote_average - a.vote_average
      );
      const _RANDOM_OVERALL_FILMS = getRandomFilms(
        sortedFilms.slice(0, 50),
        N_FILMS_TO_DISPLAY
      );
      localStorage.setItem(
        'storedRandomBestOverall',
        JSON.stringify(_RANDOM_OVERALL_FILMS)
      );
      setFilmsToDisplay((prev: any) => ({
        ...prev,
        bestOverallFilms: _RANDOM_OVERALL_FILMS,
      }));
      break;

    default:
      console.error('Unknown film type.');
  }
};
