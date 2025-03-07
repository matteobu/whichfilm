'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';
import { OramaSearchResponse } from '../utils-components/types';
import SearchFilterModal from './SearchFilterModal';
import { IoFilterSharp } from 'react-icons/io5';
import { FESTIVAL_OR_GENRE } from '../utils-components/constants';

const SearchComponent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const filmQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(filmQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(filmQuery);
  const [results, setResults] = useState<OramaSearchResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [allFilmQuery, setAllFilmQuery] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFestival, setSelectedFestival] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [noQueryResults, setNoQueryResults] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const fetchSearchResults = async (query: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/search?query=${query}`);
      const data = await response.json();
      if (data.error === 'No films found') {
        setNoQueryResults(true);
      }
      setResults(data);
      setAllFilmQuery(false);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const fetchAllFilms = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/allFilm`);
      const data = await response.json();
      setResults(data);
      setAllFilmQuery(true);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  // Handle initial state based on URL query
  useEffect(() => {
    if (initialLoad) {
      if (filmQuery) {
        fetchSearchResults(filmQuery);
      } else {
        fetchAllFilms();
      }
      setInitialLoad(false);
    }
  }, [filmQuery, initialLoad]);

  // Handle search based on debounced query
  useEffect(() => {
    if (!initialLoad) {
      if (debouncedQuery) {
        fetchSearchResults(debouncedQuery);
      } else {
        fetchAllFilms();
      }
    }
  }, [debouncedQuery, initialLoad]);

  const handleFilters = (filterType: string, value: string) => {
    const filterSetters = {
      [FESTIVAL_OR_GENRE.festival]: setSelectedFestival,
      [FESTIVAL_OR_GENRE.genre]: setSelectedGenre,
    };
    filterSetters[filterType]?.(value);
  };

  const handleNoQueryResults = (value: boolean) => {
    setQuery('');
    setNoQueryResults(value);
  };

  const handleClick = (q: string) => {
    setDebouncedQuery(q);

    console.log('query in film-search: ', q);
  };
  return (
    <div className="w-full flex flex-col justify-center items-center bg-gradient-dark-gray-blue">
      <SearchInput
        query={query}
        setQuery={setQuery}
        setIsModalOpen={setIsModalOpen}
        handleClick={handleClick}
        filterIconToDisplay={true}
      />

      {isModalOpen && (
        <SearchFilterModal
          results={results}
          setIsModalOpen={setIsModalOpen}
          handleFilters={handleFilters}
          selectedFestival={selectedFestival}
          selectedGenre={selectedGenre}
        />
      )}
      <SearchResults
        results={results}
        isLoading={isLoading}
        noSearch={allFilmQuery}
        noQueryResults={noQueryResults}
        handleNoQueryResults={handleNoQueryResults}
        selectedFestival={selectedFestival}
        selectedGenre={selectedGenre}
      />
    </div>
  );
};

export default SearchComponent;
