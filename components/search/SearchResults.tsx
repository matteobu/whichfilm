'use client';
import FilmCard from '../cards/FilmCard';
import NoResults from '../error/noResults';
import { OramaSearchResponse } from '../utils-components/types';
import { getRandomObjects } from '../utils-components/utils';

interface SearchResultsProps {
  results: OramaSearchResponse;
  noSearch: boolean;
}

const SearchResults = ({ results, noSearch }: SearchResultsProps) => {
  const oramaHits = results?.hits ?? [];

  if (!oramaHits.length) {
    return <NoResults />;
  }
  const filmResults = noSearch ? getRandomObjects(oramaHits, 20) : oramaHits;
  if (filmResults.length === 0) {
    return <NoResults />;
  }
  return filmResults && filmResults.length === 0 ? (
    <NoResults />
  ) : (
    <>
      <div className="text-center">
        {noSearch ? (
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 m-2">
            We’ve got you covered with today’s picks while you keep hunting for
            more.{' '}
          </h1>
        ) : (
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 m-2">
            Alright, here’s what you’re looking for... don’t get too excited,
            it’s not a jackpot.
          </h1>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {filmResults?.map((film, index) => (
          <div key={index} style={{ flexBasis: 'calc(25% - 1rem)' }}>
            <FilmCard film={film} />
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchResults;
