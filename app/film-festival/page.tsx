import FilmFestivalCard from '../../components/cards/FilmFestivalCard';
import filmFestivals from '../../database/jsonFiles/indieFilmFestivals.json';

const FilmFestivalList: React.FC = () => {
  return (
    <main className="bg-gradient-dark-violet min-h-screen flex flex-col items-center justify-center text-white py-10">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 mb-6">
          The list of the best indie film festivals around the world
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filmFestivals.map((festival, index) => (
            <FilmFestivalCard key={index} festival={festival} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default FilmFestivalList;
