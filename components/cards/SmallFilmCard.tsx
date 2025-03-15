'use client';
import Link from 'next/link';
import defaultImage from '../../assets/logo.png';
import { SmallFilmCardProps } from '../../utils/types';
import Image from 'next/image';

const SmallFilmCard: React.FC<SmallFilmCardProps> = ({ film }) => {
  if (!film) {
    return null;
  }

  const { title, poster_path, infoIndieAndAwards, vote_average, tagline } =
    film;
  const imageSrc = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : defaultImage.src;

  const isNotIndie = infoIndieAndAwards.notStrictIndie;

  return (
    <Link
      href={`/film-search/${film.id}`}
      className="block m-2 text-xl font-semibold text-pink-300 hover:text-pink-500"
    >
      <div className="w-[150px] h-[210px] z-9 relative overflow-visible border-2 rounded-xl border-pink-500 group">
        <span
          className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 gap-3 
    bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <span className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500">
            {title}
          </span>
          <div className="w-8 h-[1px] bg-gray-500 opacity-30 my-2"></div>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full 
    ${isNotIndie ? 'text-red-600' : 'text-green-600'}`}
          >
            {isNotIndie ? 'ain’t that indie' : 'certified indie'}
          </span>
          <div className="w-8 h-[1px] bg-gray-500 opacity-30 my-2"></div>
          <span className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500">
            click for more juice
          </span>
        </span>
        <CircularVote vote={vote_average ? +vote_average.toFixed(1) : 0.0} />

        <Image
          src={imageSrc}
          layout="fill"
          alt={title || 'Film Image'}
          objectFit="cover"
          className="rounded-lg transition-opacity duration-300 group-hover:opacity-0"
        />
      </div>
    </Link>
  );
};

export default SmallFilmCard;

const CircularVote: React.FC<{ vote: number }> = ({ vote }) => {
  const radius = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${(vote / 10) * circumference} ${circumference}`;
  const color = vote > 7 ? '#3B82F6' : vote > 5 ? '#8B5CF6' : '#F43F5E';

  return (
    <div className="absolute bottom-[-12px] right-[-5px] w-10 h-10 flex items-center justify-center z-10 ">
      <svg width="60" height="60" viewBox="0 0 40 40" className="absolute">
        <circle
          cx="20"
          cy="20"
          r={radius + 3}
          fill="#101828"
          stroke="#ec4899"
          strokeWidth="1.5"
        />
        <circle
          cx="20"
          cy="20"
          r={radius}
          fill="#101828"
          stroke="gray"
          strokeWidth="2"
          opacity="0.5"
        />
        <circle
          cx="20"
          cy="20"
          r={radius}
          fill="#101828"
          stroke={color}
          strokeWidth="2"
          strokeDasharray={strokeDasharray}
          strokeDashoffset="0"
          strokeLinecap="round"
          transform="rotate(-90 20 20)"
        />
      </svg>
      <span className="text-white text-sm font-bold z-10">{vote}</span>
    </div>
  );
};
