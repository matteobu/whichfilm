import { getFilmFestivalOrAward } from '../../../components/utils-components/utils';
import filmData from '../../../database/jsonFiles/filmFetched.json';
import SimilarFilmsBox from '../../../components/search/SimilarFilmBox';
import CastGrid from '../../../components/cards/CastCrewGrid';

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
    spoken_languages,
    infoIndieAndAwards,
    cast,
    crew,
  } = filmInfo;

  // Extract the key dynamically
  const indieAwards = infoIndieAndAwards;

  // Find the key dynamically (excluding known keys)
  const festival = Object.keys(indieAwards).find(
    (key) => key !== 'notStrictIndie' && key !== 'noteOnIndie'
  );

  const awards = festival ? indieAwards[festival].awards : [];

  console.log(awards);

  const year = release_date.split('-')[0];
  const languageList = spoken_languages.map((lang) => lang).join(', ');
  const genreList = genres.map((genre) => genre).join(', ');
  const cast_crew = [...crew, ...cast.slice(0, 4)];

  return (
    <main className="bg-gradient-dark-gray-blue min-h-screen text-white">
      <section className="flex flex-col md:flex-row gap-8 items-stretch max-w-7xl mx-auto px-6 py-2">
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

          <div className="absolute bottom-2 left-4 text-white bg-opacity-50 rounded-lg">
            <p>
              <strong>Genres:</strong> {genreList}
            </p>
            <p>
              <strong>Languages:</strong> {languageList}
            </p>
            <p>
              <strong>Year:</strong> {year}
            </p>
            <p>
              <strong>Festival & Award:</strong>{' '}
              {getFilmFestivalOrAward(festival, 'festival')}
              {' -- '}
              {awards &&
                awards.map((a) => {
                  getFilmFestivalOrAward(a, 'award');
                })}
            </p>
          </div>

          <div className="absolute inset-0 flex justify-center items-center rounded-2xl">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 text-center">
              {title}
            </h1>
          </div>
        </div>
        <div className="relative w-full md:w-1/2 min-h-96 flex flex-col items-center justify-between space-y-6">
          <div className="w-full text-center">
            <div className="w-full text-start text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 mt-4">
              <p>Quick rundown</p>
            </div>
            <p className="text-lg text-start">{overview}</p>
          </div>
          <div className="w-full mt-6 rounded-lg">
            <CastGrid cast={cast_crew} />
          </div>
        </div>
        {/* <div className="w-full md:w-1/2 min-h-96 flex items-center justify-center">
            <iframe
              className="w-1/2 h-full rounded-lg shadow-xl"
              src={`https://www.youtube.com/embed/${filmInfo.title} trailer`}
              title="Trailer"
              allowFullScreen
            />
          </div> */}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto px-6 pb-10 ">
        <SimilarFilmsBox title={title} genres={genres} filmData={filmData} />
      </section>
    </main>
  );
}
