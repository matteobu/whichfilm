import CFF_PALME_DOR from '../../data/CFF_PALME_DOR_FILMS_WINNERS.json';
import CFF_GRAND_PRIX from '../../data/CFF_GRAND_PRIX_FILMS_WINNERS.json';
import FilmCard from '../../components/cards/FilmCard';

const CFF_PALME_DOR_IDS = CFF_PALME_DOR.map((film) => film.id);
const CFF_GRAND_PRIX_IDS = CFF_GRAND_PRIX.map((film) => film.id);

const filmIds = [...CFF_PALME_DOR_IDS, ...CFF_GRAND_PRIX_IDS];

export default function FilmsTable() {
  return (
    <main className="bg-gradient-dark-violet min-h-screen flex flex-col items-center justify-center text-white py-10">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 mb-6">
          This is a list of film awarded with the Palme d'Or or Grand Prix at
          the Cannes Film Festival
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filmIds.map((id) => (
            <FilmCard id={id} />
          ))}
        </div>
      </div>
    </main>
  );
}
