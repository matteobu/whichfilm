'use client';
import { useState, useEffect } from 'react';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 100);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery) {
      // Fetch from the server-side API that calls Orama
      fetch(`/api/search?query=${debouncedQuery}`)
        .then((res) => res.json())
        .then((data) => setResults(data))
        .catch((error) => console.error('Fetch error:', error));
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

  return (
    <div className="w-full flex flex-col justify-center items-center bg-gradient-dark-violet">
      <SearchInput query={query} setQuery={setQuery} />
      <SearchResults results={results} />
    </div>
  );
};

export default SearchComponent;
