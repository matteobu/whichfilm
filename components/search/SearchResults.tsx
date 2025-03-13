'use client';
import { useEffect, useMemo } from 'react';
import FilmCard from '../cards/FilmCard';
import Loading from '../error/Loading';
import NoResults from '../error/No-Results';
import { SearchResultsProps } from '../../utils/types';

const ITEMS_PER_PAGE = 20;

const SearchResults = ({
  results,
  isLoading,
  noSearch,
  noQueryResults,
  handleNoQueryResults,
  selectedFestival,
  selectedGenre,
}: SearchResultsProps) => {
  const oramaHits = results?.hits ?? [];

  const filteredResults = useMemo(() => {
    if (!oramaHits.length) return [];

    return oramaHits.filter((film) => {
      const matchesFestival =
        !selectedFestival || film.document.infoIndieAndAwards[selectedFestival];
      const matchesGenre =
        !selectedGenre || film.document.genres?.includes(selectedGenre);

      return matchesFestival && matchesGenre;
    });
  }, [oramaHits, selectedFestival, selectedGenre]);

  if (noQueryResults) {
    return <NoResults onClose={() => handleNoQueryResults(false)} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (filteredResults.length === 0 && oramaHits.length === 0) {
    return <NoResults onClose={() => handleNoQueryResults(false)} />;
  }

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
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {filteredResults.map((film, index) => (
          <div key={index} style={{ flexBasis: 'calc(25% - 1rem)' }}>
            <FilmCard film={film} />
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchResults;
