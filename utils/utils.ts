import { FESTIVAL_NAMES } from './constants';
import { OramaSearchHits } from './types';

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
  const storedFilms = localStorage.getItem('filmsData');
  const storedTimestamp = localStorage.getItem('filmsTimestamp');
  const currentTime = new Date().getTime();
  return { storedFilms, storedTimestamp, currentTime };
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
