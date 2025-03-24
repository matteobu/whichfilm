import { SearchRandomType } from '../../utils/types';
import * as utils from '../../utils/utils';

beforeEach(() => {
  jest
    .spyOn(utils, 'getRandomFilms')
    .mockReturnValue([{ id: 99, title: 'Mocked Film' }]);
  jest.spyOn(global.localStorage.__proto__, 'setItem');
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('fetchFilms', () => {
  test('fetches and stores random films', async () => {
    const mockSetFilmsToDisplay = jest.fn();
    const mockSetRandomFilmFestival = jest.fn();

    await utils.fetchFilms(
      SearchRandomType.RANDOM,
      mockSetFilmsToDisplay,
      mockSetRandomFilmFestival
    );

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'storedRandomFilms',
      JSON.stringify([{ id: 99, title: 'Mocked Film' }])
    );

    expect(mockSetFilmsToDisplay).toHaveBeenCalledWith(expect.any(Function));
    const updateStateFunction = mockSetFilmsToDisplay.mock.calls[0][0];

    const updatedState = updateStateFunction({
      randomFilms: [],
      bestOverallFilms: [],
      bestFFFilms: [],
    });

    expect(updatedState).toEqual({
      randomFilms: [{ id: 99, title: 'Mocked Film' }],
      bestOverallFilms: [],
      bestFFFilms: [],
    });
  });
});
