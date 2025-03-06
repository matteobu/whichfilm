'use client';
import Link from 'next/link';
import { TbAlertOctagonFilled } from 'react-icons/tb';
import { BsFillAwardFill } from 'react-icons/bs';
import FilmTag from './FilmTag';
import defaultImage from '../../assets/logo.png';
import { FilmCardProps } from '../utils-components/types';
import { FESTIVAL_NAMES } from '../utils-components/constants';

const FilmCard: React.FC<FilmCardProps> = ({ film }) => {
  if (!film) {
    return null;
  }

  const {
    title,
    backdrop_path,
    release_date,
    overview,
    genres,
    infoIndieAndAwards,
  } = film.document;

  const festival = Object.keys(infoIndieAndAwards).find(
    (key) => key !== 'notStrictIndie' && key !== 'noteOnIndie'
  );
  const year = release_date.split('-')[0];
  const imageSrc = backdrop_path
    ? `https://image.tmdb.org/t/p/w500${backdrop_path}`
    : defaultImage.src;

  return (
    <Link
      href={`/film-search/${film.id}`}
      className="block text-xl font-semibold text-pink-300 hover:text-pink-500 text-center"
    >
      <div className="relative max-w-sm w-72 h-96 rounded-2xl overflow-hidden shadow-lg bg-dark-violet hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col">
        <div className="relative w-full h-48">
          <h1 className="absolute  top-0 left-0 w-full text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 p-4 text-center z-10">
            {title.toUpperCase()}
          </h1>
          <img
            className="w-full h-full object-cover  rounded-t-2xl opacity-60"
            src={imageSrc}
            alt={title || 'Film Image'}
          />
          {infoIndieAndAwards.notStrictIndie && (
            <div className="absolute top-2 right-2 flex items-center z-10">
              <TbAlertOctagonFilled
                className="text-red-500 text-2xl"
                title=" Not Strictly an Independent Film"
              />
            </div>
          )}
        </div>

        <div className="p-2 flex flex-col flex-grow">
          <p className="text-mint-500 text-sm mt-2 line-clamp-3">{overview}</p>
          <div className="flex flex-col gap-1 mt-auto">
            <p className="text-violet-200 text-xs mt-2 line-clamp-3 flex items-center gap-2">
              <BsFillAwardFill />
              Award secured at {FESTIVAL_NAMES[festival]}.
            </p>

            <div className="flex flex-row gap-2">
              <FilmTag text={year || 'n.d.'} />
              <FilmTag text={genres[0]} />
              <FilmTag text={genres[1]} />
              <FilmTag text={genres[2]} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FilmCard;
