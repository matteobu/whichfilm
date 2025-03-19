import React from 'react';
import festivalData from '../../../database/jsonFiles/indieFilmFestivals.json';
import FilmFestivalClient from '../../../components/festival/FilmFestivalClient';
import { Festival } from '../../../utils/types';

export default async function FilmFestivalPage({ params }) {
  const { slug } = await params;
  const festivalInfo: Festival = festivalData.find(
    (f) => f.id === Number(slug)
  );

  if (!festivalInfo) {
    return (
      <main className="bg-gradient-to-r from-purple-900 via-indigo-900 to-violet-700 min-h-screen flex items-center justify-center text-white py-10">
        <h2>Loading...</h2>
      </main>
    );
  }

  return <FilmFestivalClient festivalInfo={festivalInfo} />;
}
