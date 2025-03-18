'use client';
import Link from 'next/link';
import Image from 'next/image';
import { IoMdInformationCircle } from 'react-icons/io';
import youtube_links from '../../database/jsonFiles/youtube_links.json';
import defaultImage from '../../assets/logo.png';
import { SmallFilmCardProps } from '../../utils/types';

const SmallFilmCard: React.FC<SmallFilmCardProps> = ({ film }) => {
  if (!film) {
    return null;
  }

  const {
    id,
    title,
    backdrop_path,
    poster_path,
    infoIndieAndAwards,
    vote_average,
  } = film;

  const isNotIndie = infoIndieAndAwards.notStrictIndie;

  const posterSrc = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : defaultImage.src;

  const backdropSrc = backdrop_path
    ? `https://image.tmdb.org/t/p/w780${backdrop_path}`
    : posterSrc;

  // Find the YouTube link for the specific film
  const youtubeObject = youtube_links.find((item) => item.id === +id);
  const youtubeUrl = `https://www.youtube.com/watch?v=${youtubeObject?.key}`;

  return (
    <div className="block m-2">
      <Link
        href={`/film-search/${film.id}`}
        className="text-xl font-semibold text-pink-300 hover:text-pink-500"
      >
        <div
          className="w-[150px] h-[210px] z-9 relative overflow-hidden border-2 rounded-xl border-pink-500 
          group transition-all duration-500 ease-in-out origin-left hover:w-[300px] hover:z-10 left-0"
        >
          <Image
            src={posterSrc}
            layout="fill"
            alt={title || 'Film Image'}
            objectFit="cover"
            className="rounded-lg transition-opacity duration-300 group-hover:opacity-0"
          />
          <Image
            src={backdropSrc}
            alt={title || 'Backdrop Image'}
            className="rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            objectFit="fill"
            layout="fill"
          />
          <span
            className="absolute inset-0 flex flex-col justify-between text-left p-4 
            opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100"
          >
            <Link
              href="/about#small-card"
              className="absolute top-1 left-1 z-20 scale-100"
            >
              <IoMdInformationCircle size={20} style={{ color: 'white' }} />
            </Link>

            <div className="flex flex-col items-start justify-between w-full mt-auto">
              <span className="text-lg font-semibold text-white text-left max-w-[250px] truncate break-words">
                {title}
              </span>
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 text-xs font-semibold text-white bg-pink-900 rounded-full hover:bg-pink-600 transition"
              >
                ▶ Watch Trailer
              </a>
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full 
                  ${
                    isNotIndie
                      ? 'text-red-500 bg-red-900/20'
                      : 'text-green-500 bg-green-900/20'
                  }`}
              >
                {isNotIndie ? 'ain’t that indie' : 'certified indie'}
              </span>
            </div>
          </span>
          <CircularVote vote={vote_average ? +vote_average.toFixed(1) : 0.0} />
        </div>
      </Link>
    </div>
  );
};

export default SmallFilmCard;

const CircularVote: React.FC<{ vote: number }> = ({ vote }) => {
  const radius = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${(vote / 10) * circumference} ${circumference}`;
  const color = vote > 7 ? '#3B82F6' : vote > 5 ? '#8B5CF6' : '#F43F5E';

  return (
    <div className="absolute bottom-0 right-0 w-10 h-10 flex items-center justify-center z-20 ">
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
      <span className="text-white text-sm font-bold z-20">{vote}</span>
    </div>
  );
};
