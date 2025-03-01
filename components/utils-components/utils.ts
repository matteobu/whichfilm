import { FESTIVAL_NAMES } from './constants';
import { OramaSearchHits } from './types';

export function getRandomObjects(
  response: OramaSearchHits[],
  num: number
): OramaSearchHits[] {
  const arrayCopy = [...response];
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth();
  const dayNumber = today.getDate();

  const seed = year * 1000 + month * 31 + dayNumber;

  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const j = (i + seed) % (i + 1);
    [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
  }

  return arrayCopy.slice(0, num) as unknown as OramaSearchHits[];
}

export function getFilmFestivalOrAward(
  festivalAward: string,
  type: 'festival' | 'award'
) {
  console.log(festivalAward);
  const filmAward = {
    special_jury_prize: 'Special Jury Prize',
    golden_lion: 'Golden Lion',
    grand_jury_prize: 'Grand Jury Prize',
  };

  if (type === 'award' && !filmAward[festivalAward]) {
    return festivalAward; // Return the original award name if it's not found in the filmAward object
  }

  return type === 'festival'
    ? FESTIVAL_NAMES[festivalAward]
    : filmAward[festivalAward];
}
