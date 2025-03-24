'use client';
import Image from 'next/image';
import Link from 'next/link';
import SmallFilmCard from '../components/cards/SmallFilmCard';
import { Suspense, useEffect, useState } from 'react';
import {
  fetchFilms,
  getInfoForLocalStorage,
  isDifferentDay,
} from '../utils/utils';
import SearchInput from '../components/search/SearchInput';
import { useRouter } from 'next/navigation';
import { SearchRandomType } from '../utils/types';
import Loading from '../components/error/Loading';

export default function Home() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [filmsToDisplay, setFilmsToDisplay] = useState({
    randomFilms: [],
    bestOverallFilms: [],
    bestFFFilms: [],
  });
  const [randomFilmFestival, setRandomFilmFestival] = useState('');
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const {
      storedRandomFilms,
      storedRandomBestOverall,
      storedRandomBestFFFilm,
      randomFestivalName,
      storedTimestamp,
      currentTime,
    } = getInfoForLocalStorage();

    const parsedTimestamp = parseInt(storedTimestamp);

    if (
      storedRandomFilms &&
      storedRandomBestOverall &&
      storedRandomBestFFFilm &&
      storedTimestamp
    ) {
      if (isDifferentDay(parsedTimestamp, currentTime)) {
        localStorage.removeItem('randomFilmsData');
        localStorage.removeItem('filmsTimestamp');
        fetchFilmsData();
      } else {
        setFilmsToDisplay({
          randomFilms: JSON.parse(storedRandomFilms),
          bestOverallFilms: JSON.parse(storedRandomBestOverall),
          bestFFFilms: JSON.parse(storedRandomBestFFFilm),
        });
        setRandomFilmFestival(randomFestivalName);
      }
    } else {
      fetchFilmsData();
    }
  }, []);

  const fetchFilmsData = async () => {
    const types = [
      SearchRandomType.RANDOM,
      SearchRandomType.OVERALL,
      SearchRandomType.BEST_OF_FF,
    ];
    await Promise.all(
      types.map(async (type) =>
        fetchFilms(type, setFilmsToDisplay, setRandomFilmFestival)
      )
    );
  };

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
          <span className="text-4xl font-bold ml-10 mb-2 z-5">
            <span className="text-white">Welcome to </span>
            <span className="text-pink-500">which film ?</span>
          </span>

          <span className="text-xl text-white z-5">
            An indie film database with award-winning gems from festivals you’ve
            probably never heard of
          </span>
          <span className="text-lg text-pink-500"> (and that’s the point)</span>

          <div className="flex justify-center items-center w-full space-x-4 mb-4 z-5">
            <SearchInput
              query={query}
              setQuery={setQuery}
              handleClick={handleClick}
              filterIconToDisplay={false}
            />
          </div>
        </div>
      </div>
      <div className="relative z-10 mt-4 flex flex-col w-full max-w-6xl mx-aut overflow-hidden">
        <h1 className="text-xl font-bold text-white bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 m-1">
          We’ve got your picks locked and loaded, or just hit up{' '}
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

        <div className="flex flex-col mt-2">
          {filmsToDisplay.randomFilms.length === 0 ? (
            <p className="text-xl text-white italic font-semibold text-center">
              Hold tight, we're digging through indie films like pros... Just
              chill and wait!
            </p>
          ) : (
            <>
              <section
                id="hot-week"
                className="w-full max-w-6xl mx-auto bg-gradient-dark-gray-blue rounded-xl shadow-2xl space-y-6 mt-8 p-4 border-1"
              >
                <h1 className="text-2xl text-transparent font-extrabold bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 text-left ml-2">
                  Hot picks of the day, only the juiciest flicks made the cut:
                </h1>
                <div className="relative w-full">
                  <div className="flex overflow-x-auto whitespace-nowrap gap-x-4 gap-y-6 items-stretch snap-x snap-mandatory scrollbar-hidden">
                    {filmsToDisplay.randomFilms.map((film, index) => (
                      <Suspense key={index} fallback={<Loading />}>
                        <SmallFilmCard key={index} film={film} />
                      </Suspense>
                    ))}
                  </div>
                </div>
              </section>

              <section
                id="random-ff-films"
                className="w-full max-w-6xl mx-auto bg-gradient-dark-gray-blue rounded-xl shadow-2xl space-y-6 mt-8 p-4 border-1"
              >
                <h1 className="text-2xl text-transparent font-extrabold bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 text-left mt-6 ml-2">
                  Straight from {randomFilmFestival.replace(/"/g, '')} Film
                  Festival, top festival gems, handpicked for your cinephile
                  cravings:
                </h1>
                <div className="relative w-full">
                  <div className="flex overflow-x-auto whitespace-nowrap gap-x-4 gap-y-6 items-stretch snap-x snap-mandatory scrollbar-hidden">
                    {filmsToDisplay.bestFFFilms.map((film, index) => (
                      <div key={index} className="snap-start">
                        <SmallFilmCard film={film} />
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section
                id="top-tier"
                className="w-full max-w-6xl mx-auto bg-gradient-dark-gray-blue rounded-xl shadow-2xl space-y-6 mt-8 p-4 border-1"
              >
                <h1 className="text-2xl text-transparent font-extrabold bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 text-left mt-6 ml-2">
                  Top-tier bangers from our indie goldmine, certified fresh:
                </h1>
                <div className="relative w-full">
                  <div className="flex overflow-x-auto whitespace-nowrap gap-x-4 gap-y-6 items-stretch snap-x snap-mandatory scrollbar-hidden">
                    {filmsToDisplay.bestOverallFilms.map((film, index) => (
                      <SmallFilmCard key={index} film={film} />
                    ))}
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
