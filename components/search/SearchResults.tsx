'use client';
import { useState } from 'react';
import FilmCard from '../cards/FilmCard';
import NoResults from '../error/noResults';
import { SearchResultsProps } from '../utils-components/types';
import { getRandomObjects } from '../utils-components/utils';
import { FESTIVAL_NAMES } from '../utils-components/constants';

const SearchResults = ({ results, noSearch }: SearchResultsProps) => {
  const oramaHits = results?.hits ?? [];
  if (!oramaHits.length) return <NoResults />;

  const filmResults = noSearch ? getRandomObjects(oramaHits, 20) : oramaHits;
  if (filmResults.length === 0) return <NoResults />;

  const uniqueFestivals = Object.keys(FESTIVAL_NAMES);
  const uniqueGenres = Array.from(
    new Set(filmResults.flatMap((film) => film.document.genres || []))
  );

  const [selectedFestival, setSelectedFestival] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const filteredResults = filmResults.filter((film) => {
    const matchesFestival =
      !selectedFestival || film.document.festival?.includes(selectedFestival);
    const matchesGenre =
      !selectedGenre || film.document.genres?.includes(selectedGenre);

    return matchesFestival && matchesGenre;
  });

  return (
    <>
      <div className="text-center">
        {noSearch ? (
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 m-2">
            We’ve got you covered with today’s picks while you keep hunting for
            more.
          </h1>
        ) : (
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 m-2">
            Alright, here’s what you’re looking for... don’t get too excited,
            it’s not a jackpot.
          </h1>
        )}

        {/* Filter Buttons - Film Festival */}
        <div className="flex flex-wrap justify-center gap-1 my-4">
          <button
            className={`px-2 py-1 text-xs rounded-md font-semibold transition ${
              !selectedFestival
                ? 'bg-pink-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => setSelectedFestival(null)}
          >
            All Festivals
          </button>
          {uniqueFestivals.map((festival) => (
            <button
              key={festival}
              className={`px-2 py-1 text-xs rounded-md font-semibold transition ${
                selectedFestival === festival
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => setSelectedFestival(festival)}
            >
              {FESTIVAL_NAMES[festival]} {/* Display the full name */}
            </button>
          ))}
        </div>

        {/* Filter Buttons - Genres */}
        <div className="flex flex-wrap justify-center gap-1 my-4">
          <button
            className={`px-2 py-1 text-xs rounded-md font-semibold transition ${
              !selectedGenre
                ? 'bg-blue-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => setSelectedGenre(null)}
          >
            All Genres
          </button>
          {uniqueGenres.map((genre) => (
            <button
              key={genre}
              className={`px-2 py-1 text-xs rounded-md font-semibold transition ${
                selectedGenre === genre
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => setSelectedGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Film Results Grid */}
      {filteredResults.length === 0 ? (
        <NoResults />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {filteredResults.map((film, index) => (
            <div key={index} style={{ flexBasis: 'calc(25% - 1rem)' }}>
              <FilmCard film={film} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SearchResults;
