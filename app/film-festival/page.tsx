import FilmFestivalCard from '../../components/cards/FilmFestivalCard';
import filmFestivals from '../../database/jsonFiles/indieFilmFestivals.json';

const FilmFestivalList: React.FC = () => {
  return (
    <main className="bg-gradient-dark-gray-blue min-h-screen flex flex-col items-center justify-start text-white py-5">
      <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 mb-6">
        Epic list of film festivals we've managed to cram into our database (so
        far)
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filmFestivals.map((festival, index) => (
          <FilmFestivalCard key={index} festival={festival} />
        ))}
      </div>
    </main>
  );
};

export default FilmFestivalList;
