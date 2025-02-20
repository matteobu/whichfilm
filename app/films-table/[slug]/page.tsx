import filmData from '../../../data/CFF_PALME_DOR_FILMS_WINNERS.json';

export default async function FilmPage({ params }) {
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

  const {
    title,
    backdrop_path,
    release_date,
    overview,
    genres,
    runtime,
    vote_average,
    vote_count,
    spoken_languages,
  } = filmInfo;

  const year = release_date.split('-')[0];
  const languageList = spoken_languages.map((lang) => lang.name).join(', ');
  const genreList = genres.map((genre) => genre.name).join(', ');

  return (
    <main className="bg-gradient-to-r from-purple-900 via-indigo-900 to-violet-700 min-h-screen text-white">
      {/* Header & Trailer Section - Two Equal Columns */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row gap-8 items-stretch">
          {/* Left: Header Section */}
          <div className="relative w-full md:w-1/2 min-h-96 flex flex-col justify-center items-center">
            {backdrop_path ? (
              <img
                className="absolute inset-0 w-full h-full object-cover opacity-70 rounded-2xl"
                src={`https://image.tmdb.org/t/p/w1280${backdrop_path}`}
                alt={title}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white">
                <p>No Image Available</p>
              </div>
            )}
            <div className="absolute inset-0 flex justify-center items-center rounded-2xl">
              <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 text-center">
                {title}
              </h1>
            </div>
          </div>

          {/* Right: YouTube Trailer - Same Height as Left */}
          <div className="w-full md:w-1/2 min-h-96 flex items-center justify-center">
            <iframe
              className="w-full h-full rounded-lg shadow-xl"
              src={`https://www.youtube.com/embed/${filmInfo.imdb_id}`}
              title="Trailer"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-10">
        {' '}
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <p className="text-lg">{overview}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 mb-4">
                Film Details
              </h2>
              <p>
                <strong>Genres:</strong> {genreList}
              </p>
              <p>
                <strong>Runtime:</strong> {runtime} minutes
              </p>
              <p>
                <strong>Languages:</strong> {languageList}
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 mb-4">
                Ratings & Revenue
              </h2>
              <p>
                <strong>Rating:</strong> {vote_average} ({vote_count} votes)
              </p>
              <p>
                <strong>Revenue:</strong> $
                {new Intl.NumberFormat().format(filmInfo.revenue)}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
