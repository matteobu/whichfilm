'use client';
import Image from 'next/image';
import Link from 'next/link';
import SmallFilmCard from '../components/cards/SmallFilmCard';
import { useEffect, useState } from 'react';
import { OramaSearchResponse } from '../components/utils-components/types';
import { getRandomFilms } from './utils/utils';

export default function Home() {
  const [results, setResults] = useState<OramaSearchResponse>();
  const [filmsToDisplay, setFilmsToDisplay] = useState([]);

  useEffect(() => {
    fetch(`/api/allFilm`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
      })
      .catch((error) => console.error('Fetch error:', error));
  }, []);

  useEffect(() => {
    if (results?.hits) {
      setFilmsToDisplay(getRandomFilms(results.hits, 15));
    }
  }, [results]);

  return (
    <main className="flex flex-col bg-gradient-dark-gray-blue text-white h-screen overflow-hidden">
      {' '}
      <div className="w-full h-[20vh] sm:h-[25vh] relative p-2 bg-gradient-dark-gray-blue border-8 border-transparent bg-clip-border overflow-hidden rounded-4xl">
        {' '}
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
