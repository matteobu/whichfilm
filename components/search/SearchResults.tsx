'use client';

import FilmCard from '../cards/FilmCard';
import { getRandomObjects } from '../utils-components/utils';

interface SearchResultsProps {
  results: any;
  test: boolean;
}

const SearchResults = ({ results, test }: SearchResultsProps) => {
  const filmResults = test ? getRandomObjects(results, 20) : results?.hits;
  return filmResults && filmResults.length === 0 ? (
    <p>No results found</p>
  ) : (
    <>
      <div className="text-center">
        {test ? (
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 m-2">
            We’ve got you covered with today’s picks while you keep hunting for
            more.{' '}
          </h1>
        ) : (
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 m-2">
            Here are your results.
          </h1>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {filmResults?.map((film, index) => (
          <div key={index} style={{ flexBasis: 'calc(25% - 1rem)' }}>
            <FilmCard film={test ? film : film?.document} />
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchResults;
