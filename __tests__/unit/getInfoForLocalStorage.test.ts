import { getInfoForLocalStorage } from '../../utils/utils';

describe('getInfoForLocalStorage', () => {
  beforeEach(() => {
    // Clear any previous localStorage values before each test
    localStorage.clear();
  });

  it('should return correct values when localStorage contains data', () => {
    // Mocking the values in localStorage
    localStorage.setItem(
      'storedRandomFilms',
      JSON.stringify(['film1', 'film2'])
    );
    localStorage.setItem(
      'storedRandomBestOverall',
      JSON.stringify(['film3', 'film4'])
    );
    localStorage.setItem(
      'storedRandomBestFFFilm',
      JSON.stringify(['film5', 'film6'])
    );
    localStorage.setItem('randomFestivalName', 'Cannes');
    localStorage.setItem('filmsTimestamp', '1632511000000');

    // Call the function
    const result = getInfoForLocalStorage();

    // Validate the result
    expect(result.storedRandomFilms).toBe('["film1","film2"]'); // LocalStorage returns values as strings
    expect(result.storedRandomBestOverall).toBe('["film3","film4"]');
    expect(result.storedRandomBestFFFilm).toBe('["film5","film6"]');
    expect(result.randomFestivalName).toBe('Cannes');
    expect(result.storedTimestamp).toBe('1632511000000');
    expect(result.currentTime).toBeGreaterThan(0); // currentTime should be a positive number (timestamp)
  });

  it('should return null values for missing localStorage items', () => {
    // Call the function without setting any items in localStorage
    const result = getInfoForLocalStorage();

    // Validate the result
    expect(result.storedRandomFilms).toBeNull();
    expect(result.storedRandomBestOverall).toBeNull();
    expect(result.storedRandomBestFFFilm).toBeNull();
    expect(result.randomFestivalName).toBeNull();
    expect(result.storedTimestamp).toBeNull();
    expect(result.currentTime).toBeGreaterThan(0); // currentTime should be a valid timestamp
  });
});
