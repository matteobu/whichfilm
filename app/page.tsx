'use client';
import Image from 'next/image';
import Link from 'next/link';
import SmallFilmCard from '../components/cards/SmallFilmCard';
import { useEffect, useState } from 'react';
import {
  getInfoForLocalStorage,
  getRandomFilms,
  isDifferentDay,
} from '../utils/utils';
import SearchInput from '../components/search/SearchInput';
import { useRouter } from 'next/navigation';
import { FESTIVAL_NAMES } from '../utils/constants';
import filmFetched from '../database/jsonFiles/filmFetched.json';
import { SearchRandomType } from '../utils/types';

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
    await Promise.all(types.map(async (type) => fetchFilms(type)));
  };

  const fetchFilms = async (type: SearchRandomType) => {
    const _filmFetchedFiltered = filmFetched.filter(
      (film) =>
        film.infoIndieAndAwards &&
        film.infoIndieAndAwards.notStrictIndie === false &&
        film.backdrop_path !== null &&
        film.poster_path !== null
    );
    const actualDate = new Date().getTime().toString();
    localStorage.setItem('filmsTimestamp', actualDate);

    switch (type) {
      case SearchRandomType.RANDOM:
        const _RANDOM_FILMS = getRandomFilms(_filmFetchedFiltered, 7);
        localStorage.setItem(
          'storedRandomFilms',
          JSON.stringify(_RANDOM_FILMS)
        );
        setFilmsToDisplay((prev) => ({ ...prev, randomFilms: _RANDOM_FILMS }));
        break;

      case SearchRandomType.BEST_OF_FF:
        const festivalNames = Object.values(FESTIVAL_NAMES);
        const randomFestival =
          festivalNames[Math.floor(Math.random() * festivalNames.length)];
        setRandomFilmFestival(randomFestival);
        localStorage.setItem(
          'randomFestivalName',
          JSON.stringify(randomFestival)
        );
        const filteredFilms = _filmFetchedFiltered.filter(
          (film) => film.infoIndieAndAwards[randomFestival.toLowerCase()]
        );
        const _RANDOM_OVERALL_FF_FILMS = getRandomFilms(
          filteredFilms.sort((a, b) => b.vote_average - a.vote_average),
          7
        );
        localStorage.setItem(
          'storedRandomBestFFFilm',
          JSON.stringify(_RANDOM_OVERALL_FF_FILMS)
        );
        setFilmsToDisplay((prev) => ({
          ...prev,
          bestFFFilms: _RANDOM_OVERALL_FF_FILMS,
        }));
        break;

      case SearchRandomType.OVERALL:
        const sortedFilms = _filmFetchedFiltered.sort(
          (a, b) => b.vote_average - a.vote_average
        );
        const _RANDOM_OVERALL_FILMS = getRandomFilms(
          sortedFilms.slice(0, 50),
          7
        );
        localStorage.setItem(
          'storedRandomBestOverall',
          JSON.stringify(_RANDOM_OVERALL_FILMS)
        );
        setFilmsToDisplay((prev) => ({
          ...prev,
          bestOverallFilms: _RANDOM_OVERALL_FILMS,
        }));
        break;

      default:
        console.error('Unknown film type.');
    }
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
      <div className="relative z-10  mt-4 flex flex-col">
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
              <h1 className="text-lg text-transparent font-extrabold bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 text-left ml-2">
                Hot picks of the week, only the juiciest flicks made the cut:
              </h1>
              <div className="flex flex-wrap justify-center">
                {filmsToDisplay.randomFilms.map((film, index) => (
                  <SmallFilmCard key={index} film={film} />
                ))}
              </div>
              <h1 className="text-lg text-transparent font-extrabold bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 text-left mt-6 ml-2">
                Straight from {randomFilmFestival.replace(/"/g, '')} Film
                Festival, the dopest festival gems, handpicked for your
                cinephile cravings:
              </h1>
              <div className="flex flex-wrap justify-center">
                {filmsToDisplay.bestFFFilms.map((film, index) => (
                  <SmallFilmCard key={index} film={film} />
                ))}
              </div>
              <h1 className="text-lg text-transparent font-extrabold bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 text-left mt-6 ml-2">
                Top-tier bangers from our indie goldmine, certified fresh:
              </h1>
              <div className="flex flex-wrap justify-center">
                {filmsToDisplay.bestOverallFilms.map((film, index) => (
                  <SmallFilmCard key={index} film={film} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="relative z-10 text-center m-4 flex flex-col border-t-2 border-t-pink-500">
        <h1 className="text-sm text-transparent font-extrabold bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 text-left mt-6 ml-2">
          This is an independent, open-source web app developed by{' '}
          <Link
            href="https://matteo.codes"
            className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500"
          >
            matteo.codes
          </Link>
          . Content is for informational purposes only. The developers do not
          guarantee accuracy or reliability. Use at your own risk and in
          compliance with applicable laws. <br></br>This project is intended to
          be open-source, and any help is truly appreciated. The repository can
          be found at this{' '}
          <Link
            href="https://github.com/matteobu/whichfilm"
            className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500"
          >
            GitHub Repo
          </Link>
          . For inquiries, suggestions, or corrections, you can contact the
          developers at{' '}
          <Link
            href="mailto:your-email@example.com"
            className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500"
          >
            matteo.codes@pm.me
          </Link>
          .
        </h1>
      </div>
    </main>
  );
}
