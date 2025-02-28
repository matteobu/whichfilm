'use client';
import { useState, useEffect } from 'react';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';
import { OramaSearchResponse } from '../utils-components/types';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState<OramaSearchResponse>();
  const [allFilmQuery, setAllFilmQuery] = useState(false);

  useEffect(() => {
    fetch(`/api/allFilm`)
      .then((res) => res.json())
      .then((data) => {
        setAllFilmQuery(true);
        setResults(data);
      })
      .catch((error) => console.error('Fetch error:', error));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery) {
      fetch(`/api/search?query=${debouncedQuery}`)
        .then((res) => res.json())
        .then((data) => {
          setAllFilmQuery(false);
          setResults(data);
        })
        .catch((error) => console.error('Fetch error:', error));
    } else {
      fetch(`/api/allFilm`)
        .then((res) => res.json())
        .then((data) => {
          setAllFilmQuery(true);
          setResults(data);
        })
        .catch((error) => console.error('Fetch error:', error));
    }
  }, [debouncedQuery]);

  return (
    <div className="w-full flex flex-col justify-center items-center bg-gradient-dark-gray-blue">
      <SearchInput query={query} setQuery={setQuery} />
      <SearchResults results={results} noSearch={allFilmQuery} />
    </div>
  );
};

export default SearchComponent;
