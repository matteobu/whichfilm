'use client';
import Link from 'next/link';
import { TbAlertOctagonFilled } from 'react-icons/tb';
import FilmTag from './FilmTag';
import defaultImage from '../../assets/logo.png';

interface FilmCardProps {
  film: any;
}

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
    festival,
    award,
    notStrictIndie,
    tmdb_id,
  } = film.document;

  const year = release_date.split('-')[0];
  const imageSrc = backdrop_path
    ? `https://image.tmdb.org/t/p/w500${backdrop_path}`
    : defaultImage.src;

  return (
    <Link
      href={`/film-search/${film.id}`}
      className="block text-xl font-semibold text-pink-300 hover:text-pink-500 text-center"
    >
      <div className="relative max-w-sm w-72 h-96 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-r from-purple-900 via-indigo-900 to-violet-700 hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col">
        <div className="relative h-48 w-full">
          <img
            className="w-full h-full object-cover rounded-t-2xl"
            src={imageSrc}
            alt={title || 'Film Image'}
          />
          {notStrictIndie && (
            <div className="absolute top-2 right-2 flex items-center">
              <TbAlertOctagonFilled
                className="text-red-500 text-2xl"
                title="Not Strictly Indie"
              />
              <span className="absolute top-0 right-0 mt-6 mr-2 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 invisible group-hover:visible">
                Not Strictly Indie
              </span>
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <h1 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 mb-2">
            {title}
          </h1>
          <p className="text-mint-500 text-sm mt-2 line-clamp-3">{overview}</p>

          <div className="flex flex-col gap-1 mt-auto">
            <div className="flex flex-row gap-2">
              <FilmTag text={year || 'n.d.'} />
              <FilmTag text={genres[0]} />
              {festival && award && <FilmTag text={festival + ' ' + award} />}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FilmCard;
