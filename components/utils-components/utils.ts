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
 * Retrieves the display name for a film festival or award based on its identifier
 *
 * @param festivalAward - The identifier string for a festival or award
 * @param type - Whether to lookup a 'festival' or 'award' display name
 * @returns The human-readable display name for the given festival or award
 */
export function getFilmFestivalOrAward(
  festivalAward: string,
  type: 'festival' | 'award'
) {
  const filmAward = {
    special_jury_prize: 'Special Jury Prize',
    golden_lion: 'Golden Lion',
    grand_jury_prize: 'Grand Jury Prize',
  };

  // If type is award but not found in our mapping, return the original string
  if (type === 'award' && !filmAward[festivalAward]) {
    return festivalAward;
  }

  // Return appropriate display name based on type
  return type === 'festival'
    ? FESTIVAL_NAMES[festivalAward]
    : filmAward[festivalAward];
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
    .map((title) => {
      // Find the film with a matching title (case insensitive)
      const film = filmData.find(
        (f) => f.title.toLowerCase() === title.toLowerCase()
      );
      return film ? film.id : null;
    })
    .filter((id) => id !== null); // Remove null entries for titles that weren't found
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
