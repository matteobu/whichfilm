'use client';
import Link from 'next/link';
import filmData from '../../database/jsonFiles/filmFetched.json';
import { useEffect, useMemo, useState } from 'react';
import FilterSection from './FilterSection';
import CastGrid from '../cards/CastCrewGrid';
import { Award, OramaSearchHitDocument } from '../../utils/types';
import { getGenresYearsLanguages } from '../../utils/utils';

export default function FilmFestivalClient({ festivalInfo }) {
  const [filterKeysOptions, setFilterKeysOptions] = useState({
    awards: [],
    genres: [],
    years: [],
    languages: [],
  });

  const [filterKeysValues, setFilterKeysValues] = useState({
    awards: [],
    genres: [],
    years: [],
    languages: [],
  });

  const { name, location, overview, imageUrl, awards } = festivalInfo;
  const festivalKey = decodeURIComponent(name).split(' ')[0].toLowerCase();

  // Fetch films awarded at the festival and extract filtering options
  const filmsAwarded = useMemo(() => {
    const _films = filmData.filter(
      (film) => film.infoIndieAndAwards[festivalKey]
    );
    const { genres, years, languages } = getGenresYearsLanguages(
      _films as unknown as OramaSearchHitDocument[]
    );

    setFilterKeysOptions({ awards, genres, years, languages });
    return _films;
  }, [festivalKey]);

  // Filter films based on user-selected filters
  const filmsToDisplay = useMemo(() => {
    return filmsAwarded.filter((film) => {
      const awardMatch =
        filterKeysValues.awards.length === 0 ||
        filterKeysValues.awards.some((award) =>
          film.infoIndieAndAwards[festivalKey].awards.includes(award)
        );

      const genreMatch =
        filterKeysValues.genres.length === 0 ||
        filterKeysValues.genres.some((genre) => film.genres.includes(genre));

      const filmYear = film.release_date.split('-')[0];
      const yearMatch =
        filterKeysValues.years.length === 0 ||
        filterKeysValues.years.includes(filmYear);

      const languageMatch =
        filterKeysValues.languages.length === 0 ||
        filterKeysValues.languages.some((language) =>
          film.spoken_languages.includes(language)
        );

      return awardMatch && genreMatch && yearMatch && languageMatch;
    });
  }, [filterKeysValues, filmsAwarded, festivalKey]);
  console.log(filmsToDisplay);
  // Update filter values when an option is selected or removed
  const onFilterKeysClick = (selectedOptions, filterType) => {
    console.log(selectedOptions, filterType);
    setFilterKeysValues((prevFilters) => ({
      ...prevFilters,
      [filterType]: selectedOptions.map((option) => option.value),
    }));
  };

  return (
    <main className="bg-gradient-dark-gray-blue min-h-screen text-white px-6 py-6">
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative w-full min-h-96 flex flex-col justify-center items-center rounded-xl overflow-hidden">
          <img
            className="absolute inset-0 w-full h-full object-cover opacity-70 rounded-xl"
            src={imageUrl}
            alt={name}
          />
          <div className="absolute bottom-4 left-4 p-4 rounded-lg">
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500">
              {name}
            </h1>
            <p className="text-lg font-semibold">📍 {location}</p>
          </div>
        </div>
        <div className="w-full p-4 rounded-xl bg-gray-900 bg-opacity-60 shadow-md">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500">
            Festival Overview
          </h2>
          <p className="text-lg">{overview}</p>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 mt-2">
            Awards
          </h2>
          <p className="text-lg">{awards.map((a) => a.name).join(', ')}</p>
        </div>
      </section>
      <FilterSection
        filterKeysOptions={filterKeysOptions}
        filterKeysValues={filterKeysValues}
        onFilterKeysClick={onFilterKeysClick}
      />
      <section className="max-w-7xl mx-auto mt-8">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500">
          Winning Films
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filmsToDisplay.map((film, i) => (
            <Link
              key={i}
              href={`/film-search/${film.id}`}
              className="border-2 border-blue-900 rounded-lg"
            >
              <div className="bg-gray-900 bg-opacity-60 rounded-xl shadow-md ">
                <img
                  className="w-full h-64 object-cover rounded-xl mb-4"
                  src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                  alt={film.title}
                />
                <div className="p-2">
                  <h3 className="text-xl font-bold">
                    {film.title} ({film.release_date.split('-')[0]})
                  </h3>
                  <p className="text-sm">
                    Awards:{' '}
                    {film.infoIndieAndAwards[festivalKey].awards.join(', ')}
                  </p>
                  <CastGrid cast={film.cast.slice(0, 4)} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
