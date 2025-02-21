import filmData from '../../../data/CFF_PALME_DOR_FILMS_WINNERS.json';

export default async function FilmCard({ params }) {
  const { slug } = await params;
  const filmInfo = filmData.find((f) => f.id === +slug);

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
    <main className="bg-gradient-to-r from-purple-900 via-indigo-900 to-violet-700 min-h-screen flex items-center justify-center text-white py-10">
      <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-gradient-to-r from-purple-900 via-indigo-900 to-violet-700 p-4 hover:scale-105 transition-transform duration-300 ease-in-out">
        <img
          className="w-full h-60 object-cover rounded-lg shadow-xl"
          src={`https://image.tmdb.org/t/p/w1280${backdrop_path}`}
          alt={title}
        />
        <div className="p-4">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 mb-2">
            {title}
          </h1>
          <p className="text-pink-300 text-sm mb-2">{year}</p>
          <p className="text-mint-500 text-base">{overview}</p>
        </div>
      </div>
    </main>
  );
}
