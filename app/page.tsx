'use client';
import Image from 'next/image';
import Link from 'next/link';
import SmallFilmCard from '../components/cards/SmallFilmCard';
import { useEffect, useState } from 'react';
import { OramaSearchResponse } from '../components/utils-components/types';
import {
  getInfoForLocalStorage,
  getRandomFilms,
  isDifferentDay,
} from './utils/utils';

export default function Home() {
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
        const todaysFilm = getRandomFilms(data.hits, 20);
        setFilmsToDisplay(todaysFilm);
        localStorage.setItem('filmsData', JSON.stringify(todaysFilm));
        localStorage.setItem('filmsTimestamp', new Date().getTime().toString());
      })
      .catch((error) => console.error('Fetch error:', error));
  };

  return (
    <main className="flex flex-col bg-gradient-dark-gray-blue text-white h-screen overflow-hidden">
      <div className="w-full h-[20vh] sm:h-[25vh] relative p-2 bg-gradient-dark-gray-blue border-8 border-transparent bg-clip-border overflow-hidden rounded-4xl">
        <Image
          src="/whichfilmbanner.png"
          alt="Banner"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="text-center mt-4 flex flex-col">
        <h1 className="text-xl font-bold text-white bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 m-1">
          Just click on{' '}
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
            <div className="flex flex-wrap justify-center gap-4">
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
