import { getRandomFilms } from '../../utils/utils';

describe('getRandomFilms', () => {
  const mockFilms = [
    { id: 1, title: 'Film 1' },
    { id: 2, title: 'Film 2' },
    { id: 3, title: 'Film 3' },
    { id: 4, title: 'Film 4' },
    { id: 5, title: 'Film 5' },
  ];

  test('returns specified number of random films', () => {
    const result = getRandomFilms(mockFilms, 3);
    expect(result).toHaveLength(3);
  });

  test('does not return duplicates', () => {
    const result = getRandomFilms(mockFilms, 5);
    const ids = result.map((film) => film.id);
    expect(new Set(ids).size).toBe(5);
  });

  test('returns empty array if input is empty', () => {
    expect(getRandomFilms([], 3)).toEqual([]);
  });
});
