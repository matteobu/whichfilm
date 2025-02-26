'use client';
import Link from 'next/link';
import FilmTag from './FilmTag';
import defaultImage from '../../assets/logo.png';

interface FilmCardProps {
  film: any;
}

const FilmCard: React.FC<FilmCardProps> = ({ film }) => {
  if (!film) {
    return null;
  }

  const { title, backdrop_path, release_date, overview, genres } = film;

  const year = release_date.split('-')[0];
  const imageSrc = backdrop_path
    ? `https://image.tmdb.org/t/p/w500${backdrop_path}`
    : defaultImage.src;

  return (
    <Link
      href={`/films-table/${film.tmdb_id}`}
      className="block text-xl font-semibold text-pink-300 hover:text-pink-500 text-center"
    >
      <div className="max-w-sm w-72 h-96 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-r from-purple-900 via-indigo-900 to-violet-700 hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col">
        <div className="h-48 w-full">
          <img
            className="w-full h-full object-cover rounded-t-2xl"
            src={imageSrc}
            alt={title || 'Film Image'}
          />
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <h1 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 mb-2">
            {title}
          </h1>
          <p className="text-mint-500 text-sm mt-2 line-clamp-3">{overview}</p>

          <div className="flex flex-row mt-auto gap-2">
            <FilmTag text={year} />
            {/* <FilmTag text={genres.} />
            {genres[1] && <FilmTag text={genres[1]} />} */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FilmCard;
