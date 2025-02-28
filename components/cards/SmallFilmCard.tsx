'use client';
import Link from 'next/link';
import defaultImage from '../../assets/logo.png';
import { SmallFilmCardProps } from '../utils-components/types';

const SmallFilmCard: React.FC<SmallFilmCardProps> = ({ film }) => {
  if (!film) {
    return null;
  }
  
  const { title, backdrop_path } = film.document;
  const imageSrc = backdrop_path
    ? `https://image.tmdb.org/t/p/w500${backdrop_path}`
    : defaultImage.src;

  return (
    <Link
      href={`/film-search/${film.id}`}
      className="block text-xl font-semibold text-pink-300 hover:text-pink-500"
    >
      <div className="flex items-center max-w-xs w-80 h-32 bg-dark-violet rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-pink-500 m-2">
          <img
            src={imageSrc}
            alt={title || 'Film Image'}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center pl-4 truncate">
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default SmallFilmCard;
