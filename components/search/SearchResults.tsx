'use client';

import FilmCard from '../cards/FilmCard';

interface SearchResultsProps {
  results: any;
}

const SearchResults = ({ results }: SearchResultsProps) => {
  const filmResults = results?.hits || []; // Default to an empty array if hits is undefined

  if (filmResults.length === 0) {
    return <div>No films found. Please try another search.</div>;
  }

  return (
    <div className="flex flex-wrap gap-4 mt-2">
      {filmResults.map((film, index) => (
        <div
          key={index}
          className="flex-grow-0 flex-shrink-0"
          style={{ flexBasis: 'calc(25% - 1rem)' }}
        >
          <FilmCard film={film?.document} />
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
