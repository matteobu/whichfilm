import Link from 'next/link';
import filmData from '../../data/CFF_PALME_DOR_FILMS_WINNERS.json';
import FilmCard from '../../components/filmCard';

const randomIds = [927547, 467244, 18095, 336050]; // mocked data

export default function FilmsTable() {
  return (
    <main className="bg-gradient-dark-violet min-h-screen flex flex-col items-center justify-center text-white py-10">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 mb-6">
          The Films
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {randomIds.map((id) => (
            <FilmCard id={id} />
          ))}
        </div>
      </div>
    </main>
  );
}
