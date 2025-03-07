'use client';
import Link from 'next/link';
import defaultImage from '../../assets/logo.png';
import { SmallFilmCardProps } from '../utils-components/types';
import Image from 'next/image';

const SmallFilmCard: React.FC<SmallFilmCardProps> = ({ film }) => {
  if (!film) {
    return null;
  }

  const { title, poster_path, infoIndieAndAwards } = film.document;
  const imageSrc = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : defaultImage.src;

  const isNotIndie = infoIndieAndAwards.notStrictIndie;
  return (
    <Link
      href={`/film-search/${film.id}`}
      className="block m-2 text-xl font-semibold text-pink-300 hover:text-pink-500"
    >
      <div className="w-[150px] h-[250px] relative overflow-hidden border-2 rounded-xl border-pink-500 transition-opacity duration-300 opacity-40 hover:opacity-100">
        <Image
          src={imageSrc}
          alt={title || 'Film Image'}
          className="object-cover"
          width={150}
          height={250}
        />
        {isNotIndie ? (
          <div className="relative bottom-0 left-0 w-full bg-red-800 opacity-80 text-white text-center text-sm py-1 z-20">
            this ain’t that indie
          </div>
        ) : (
          <div className="absolute bottom-0 left-0 w-full bg-green-800 opacity-80 text-white text-center text-sm py-1 z-20">
            whichfilm approved
          </div>
        )}
      </div>
    </Link>
  );
};

export default SmallFilmCard;
