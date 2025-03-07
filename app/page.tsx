'use client';
import Image from 'next/image';
import Link from 'next/link';
import SmallFilmCard from '../components/cards/SmallFilmCard';
import { useEffect, useState } from 'react';
import {
  getInfoForLocalStorage,
  getRandomFilms,
  isDifferentDay,
} from './utils/utils';
import SearchInput from '../components/search/SearchInput';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [filmsToDisplay, setFilmsToDisplay] = useState([]);

  useEffect(() => {
    const { storedFilms, storedTimestamp, currentTime } =
      getInfoForLocalStorage();

    if (storedFilms && storedTimestamp) {
      const parsedTimestamp = parseInt(storedTimestamp);
      if (isDifferentDay(parsedTimestamp, currentTime)) {
        localStorage.removeItem('filmsData');
        localStorage.removeItem('filmsTimestamp');
        fetchFilms();
      } else {
        const parsedFilms = JSON.parse(storedFilms);
        setFilmsToDisplay(parsedFilms);
      }
    } else {
      fetchFilms();
    }
  }, []);

  const fetchFilms = () => {
    fetch(`/api/allFilm`)
      .then((res) => res.json())
      .then((data) => {
        const todaysFilm = getRandomFilms(data.hits, 7);
        setFilmsToDisplay(todaysFilm);
        localStorage.setItem('filmsData', JSON.stringify(todaysFilm));
        localStorage.setItem('filmsTimestamp', new Date().getTime().toString());
      })
      .catch((error) => console.error('Fetch error:', error));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  const router = useRouter();

  const handleClick = (q: string) => {
    router.push(`/film-search?query=${debouncedQuery}`);
  };

  return (
    <main className="w-full flex flex-col justify-center items-center bg-gradient-dark-gray-blue">
      <div className="relative w-full h-[30vh] sm:h-[30vh]">
        <Image
          src="/whichfilm.png"
          alt="Banner"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 opacity-50"
        />

        <div className="w-full flex flex-col justify-center items-center bg-gradient-dark-gray-blue p-3">
          <div className="flex justify-center z-50 items-center w-full space-x-4 mb-4">
            <SearchInput
              query={query}
              setQuery={setQuery}
              handleClick={handleClick}
              filterIconToDisplay={false}
            />
          </div>
        </div>
      </div>
      <div className="relative z-10 text-center mt-4 flex flex-col">
        <h1 className="text-xl font-bold text-white bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 m-1">
          We’ve got your week’s picks locked and loaded, or just hit up{' '}
          <Link
            href="/film-search"
            className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500"
          >
            Films{' '}
          </Link>
          or{' '}
          <Link
            href="/film-festival"
            className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500"
          >
            Film Festival{' '}
          </Link>
          and hunt down that flick you’re craving!
        </h1>
        <div className="flex flex-col items-center mt-2">
          {filmsToDisplay.length === 0 ? (
            <p className="text-xl text-white italic font-semibold">
              Hold tight, we're digging through indie films like pros... Just
              chill and wait!
            </p>
          ) : (
            <div className="flex flex-wrap justify-center">
              {filmsToDisplay.map((film, index) => (
                <SmallFilmCard key={index} film={film} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
