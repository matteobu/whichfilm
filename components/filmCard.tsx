// components/FilmCard.tsx
import Link from 'next/link';
import filmData from '../data/CFF_PALME_DOR_FILMS_WINNERS.json';

interface FilmCardProps {
  id: number;
}

const FilmCard: React.FC<FilmCardProps> = async ({ id }) => {
  const filmInfo = filmData.find((f) => f.id === id);

  if (!filmInfo) {
    return (
      <main className="bg-gradient-to-r from-purple-900 via-indigo-900 to-violet-700 min-h-screen flex items-center justify-center text-white py-10">
        <div className="text-white">
          <h2>Film not found</h2>
        </div>
      </main>
    );
  }

  const { title, backdrop_path, release_date, overview } = filmInfo;
  const year = release_date.split('-')[0];

  return (
    <Link
      href={`/films-table/${id}`}
      className="block text-xl font-semibold text-pink-300 hover:text-pink-500 text-center"
    >
      <div className="max-w-sm w-72 h-96 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-r from-purple-900 via-indigo-900 to-violet-700 p-4 hover:scale-105 transition-transform duration-300 ease-in-out">
          <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 mb-2">
            {title}
          </h1>
        <img
          className="w-full h-48 object-cover rounded-lg shadow-xl"
          src={`https://image.tmdb.org/t/p/w1280${backdrop_path}`}
          alt={title}
        />
        <div className="p-4 flex flex-col justify-between h-full">
          <p className="text-pink-300 text-sm mb-2">{year}</p>
          <p className="text-mint-500 text-base flex-grow">{overview}</p>
        </div>
      </div>
    </Link>
  );
};

export default FilmCard;
