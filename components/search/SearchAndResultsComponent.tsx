'use client';
import { useState, useEffect } from 'react';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';
import { OramaSearchResponse } from '../utils-components/types';
import SearchFilterModal from './SearchFilterModal';
import { IoFilterSharp } from 'react-icons/io5';
import { FESTIVAL_OR_GENRE } from '../utils-components/constants';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState<OramaSearchResponse>();
  const [allFilmQuery, setAllFilmQuery] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [selectedFestival, setSelectedFestival] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/allFilm`)
      .then((res) => res.json())
      .then((data) => {
        setAllFilmQuery(true);
        console.log(data);
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

  const handleFilters = (filterType: string, value: string) => {
    const filterSetters = {
      [FESTIVAL_OR_GENRE.festival]: setSelectedFestival,
      [FESTIVAL_OR_GENRE.genre]: setSelectedGenre,
    };
    const setter = filterSetters[filterType];
    if (setter) {
      setter(value);
    } else {
      console.warn(`Unknown filter type: ${filterType}`);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center bg-gradient-dark-gray-blue">
      <div className="flex justify-center items-center w-full space-x-4 mb-4">
        <SearchInput query={query} setQuery={setQuery} />
        <button
          className="px-4 py-2 text-white bg-pink-500 rounded-lg hover:bg-pink-900 transition"
          onClick={() => setIsModalOpen(true)}
        >
          <IoFilterSharp size={24} />
        </button>
      </div>
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
        noSearch={allFilmQuery}
        selectedFestival={selectedFestival}
        selectedGenre={selectedGenre}
      />
    </div>
  );
};

export default SearchComponent;
