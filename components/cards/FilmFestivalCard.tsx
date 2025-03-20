import React from 'react';
import defaultImage from '../../assets/logo.png';
import { FilmFestivalCardProps } from '../../utils/types';
import Link from 'next/link';

const FilmFestivalCard: React.FC<FilmFestivalCardProps> = ({ festival }) => {
  return (
    <Link
      href={`/film-festival/${festival.id}`}
      className="block m-2 text-xl font-semibold text-pink-300 hover:text-pink-500"
    >
      <div className="w-48 h-64 rounded-lg overflow-hidden shadow-lg bg-gradient-to-r from-purple-900 via-indigo-900 to-violet-700 p-1 hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col items-center">
        {festival.imageUrl ? (
          <img
            src={
              festival.imageUrl === 'undefined'
                ? defaultImage.src
                : festival.imageUrl
            }
            alt={festival.name}
            className="w-full h-32 object-cover rounded-lg mb-4"
          />
        ) : (
          <div className="w-full h-32 bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
            <p className="text-white">No Image</p>
          </div>
        )}
        <h1 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 mb-1 text-center">
          {festival.name}
        </h1>
        <p className="text-sm text-white mb-2 text-center">
          {festival.location}
        </p>
        <p className="text-sm text-white line-clamp-3 text-center">
          {festival.overview}
        </p>
      </div>
    </Link>
  );
};

export default FilmFestivalCard;
