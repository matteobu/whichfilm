import FilmCard from '../../components/cards/FilmCard';
import { getAllFilms } from '../api/allFilm/route';

interface FilmsTableProps {
  films?: any[];
}

export default function FilmsTable({ films }: FilmsTableProps) {
  const filmsToDisplay = films || getAllFilms();

  return (
    <main className="bg-gradient-dark-violet min-h-screen flex flex-col items-center justify-center text-white py-10">
      <div className="text-center">
        {/* <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 mb-6">
          This is a list of films awarded the Palme d’Or or Grand Prix at the
          Cannes Film Festival.
        </h1> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filmsToDisplay.map((f, index) => (
            <FilmCard key={index} film={f} />
          ))}
        </div>
      </div>
    </main>
  );
}
