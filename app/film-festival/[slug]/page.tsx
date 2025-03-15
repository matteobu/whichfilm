import festivalData from '../../../database/jsonFiles/indieFilmFestivals.json';
import filmData from '../../../database/jsonFiles/filmFetched.json';
import CastGrid from '../../../components/cards/CastCrewGrid';

export default async function FilmFestivalPage({ params }) {
  const { slug } = await params;

  const festivalInfo = festivalData.find((f) => f.id === +slug);

  if (!festivalInfo) {
    return (
      <main className="bg-gradient-to-r from-purple-900 via-indigo-900 to-violet-700 min-h-screen flex items-center justify-center text-white py-10">
        <h2>Festival not found</h2>
      </main>
    );
  }

  const { id, name, location, overview, imageUrl, awards } = festivalInfo;
  const festivalKey = decodeURIComponent(name).split(' ')[0].toLowerCase();
  const winningFilms = filmData.filter(
    (film) => film.infoIndieAndAwards[festivalKey]
  );

  return (
    <main className="bg-gradient-dark-gray-blue min-h-screen text-white px-6 py-6">
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative w-full min-h-96 flex flex-col justify-center items-center rounded-xl overflow-hidden">
          <img
            className="absolute inset-0 w-full h-full object-cover opacity-70 rounded-xl"
            src={imageUrl}
            alt={name}
          />
          <div className="absolute bottom-4 left-4 p-4 rounded-lg">
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500">
              {name}
            </h1>
            <p className="text-lg font-semibold">📍 {location}</p>
          </div>
        </div>
        <div className="w-full p-4 rounded-xl bg-gray-900 bg-opacity-60 shadow-md">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500">
            Festival Overview
          </h2>
          <p className="text-lg">{overview}</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto mt-8">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500">
          🏆 Awards
        </h2>
        <ul className="list-disc pl-6">
          {awards.map((award) => (
            <li key={award.award_id} className="text-lg">
              {award.name}
            </li>
          ))}
        </ul>
      </section>

      <section className="max-w-7xl mx-auto mt-8">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500">
          🎬 Winning Films
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {winningFilms.map((film) => (
            <div
              key={film.id}
              className="bg-gray-900 bg-opacity-60 p-4 rounded-xl shadow-md"
            >
              <img
                className="w-full h-64 object-cover rounded-xl mb-4"
                src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                alt={film.title}
              />
              <h3 className="text-xl font-bold">
                {film.title} ({film.release_date.split('-')[0]})
              </h3>
              <p className="text-sm">
                Awards:{' '}
                {film.infoIndieAndAwards[festivalKey].awards.join(', ')}
              </p>
              <CastGrid cast={film.cast.slice(0, 4)} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
