'use client';
import { useMemo, useState, useRef, useEffect } from 'react';
import FilmCard from '../cards/FilmCard';
import NoResults from '../error/noResults';
import { SearchResultsProps } from '../utils-components/types';

const ITEMS_PER_PAGE = 20;

const SearchResults = ({
  results,
  noSearch,
  selectedFestival,
  selectedGenre,
}: SearchResultsProps) => {
  const oramaHits = results?.hits ?? [];

  // Compute filtered results dynamically
  const filteredResults = useMemo(() => {
    if (!oramaHits.length) return [];

    return oramaHits.filter((film) => {
      const matchesFestival =
        !selectedFestival || film.document.festival?.includes(selectedFestival);
      const matchesGenre =
        !selectedGenre || film.document.genres?.includes(selectedGenre);

      return matchesFestival && matchesGenre;
    });
  }, [oramaHits, selectedFestival, selectedGenre]);

  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const visibleFilms = useMemo(() => {
    return filteredResults.slice(0, page * ITEMS_PER_PAGE);
  }, [filteredResults, page]);

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    if (
      entries[0].isIntersecting &&
      visibleFilms.length < filteredResults.length &&
      !isLoading
    ) {
      setIsLoading(true);
      setTimeout(() => {
        setPage((prevPage) => prevPage + 1);
        setIsLoading(false);
      }, 1000); // Ensure at least 1 second delay
    }
  };

  useEffect(() => {
    if (!filteredResults.length) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 1,
    });

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [filteredResults, visibleFilms]);

  // Handle empty states
  if (!oramaHits.length) return <NoResults />;
  if (filteredResults.length === 0) return <NoResults />;

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
        {visibleFilms.map((film, index) => (
          <div key={index} style={{ flexBasis: 'calc(25% - 1rem)' }}>
            <FilmCard film={film} />
          </div>
        ))}
      </div>

      {/* Loading more indicator */}
      {visibleFilms.length < filteredResults.length && (
        <div
          ref={observerRef}
          className="text-center mt-4 text-lg text-gray-500"
        >
          {isLoading ? 'Loading more...' : 'Scroll down to load more'}
        </div>
      )}
    </>
  );
};

export default SearchResults;
