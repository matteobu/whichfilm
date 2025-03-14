import filmData from '../../../database/jsonFiles/filmFetched.json';
import youtube_links from '../../../database/jsonFiles/youtube_links.json';
import SimilarFilmsBox from '../../../components/search/SimilarFilmBox';
import CastGrid from '../../../components/cards/CastCrewGrid';
import { FESTIVAL_NAMES } from '../../../utils/constants';

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
    id,
    title,
    backdrop_path,
    release_date,
    overview,
    genres,
    spoken_languages,
    infoIndieAndAwards,
    cast,
    crew,
    vote_average,
  } = filmInfo;

  const festival = Object.keys(infoIndieAndAwards).find(
    (key) => key !== 'notStrictIndie' && key !== 'noteOnIndie'
  );

  const awards = festival ? infoIndieAndAwards[festival]?.awards || [] : [];
  const noteOnIndie = infoIndieAndAwards.noteOnIndie;
  const year = release_date.split('-')[0];
  const languageList = spoken_languages.map((lang) => lang).join(', ');
  const genreList = genres.map((genre) => genre).join(', ');
  const cast_crew = [...crew, ...cast.slice(0, 4)];
  const youtubeObject = youtube_links.find((item) => item.id === id);
  const embedUrl = `https://www.youtube.com/embed/${
    youtubeObject ? youtubeObject.key : null
  }`;

  return (
    <main className="bg-gradient-dark-gray-blue min-h-screen text-white px-6 py-6">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
        <div className="relative w-full min-h-96 flex flex-col justify-center items-center rounded-xl overflow-hidden">
          {backdrop_path ? (
            <img
              className="absolute inset-0 w-full h-full object-cover opacity-70 rounded-xl"
              src={`https://image.tmdb.org/t/p/w1280${backdrop_path}`}
              alt={title}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white">
              <p>No Image Available</p>
            </div>
          )}

          <div className="absolute bottom-4 left-4  p-4 rounded-lg">
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
              <strong>Vote:</strong> {vote_average}
            </p>
            {festival && (
              <p>
                <strong>Festival & Award:</strong> {FESTIVAL_NAMES[festival]} -{' '}
                {awards.join(', ')}
              </p>
            )}
          </div>

          <div className="absolute inset-0 flex justify-center items-center">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 text-center">
              {title}
            </h1>
          </div>
        </div>
        <div className="w-full min-h-96 flex justify-center items-center">
          <iframe
            className="w-full h-full rounded-xl shadow-xl"
            src={embedUrl}
            title={`Trailer for ${filmInfo.title}`}
            allowFullScreen
          />
        </div>
        <div className="w-full min-h-96 p-4 rounded-xl bg-gray-900 bg-opacity-60 shadow-md">
          <CastGrid cast={cast_crew} />
          <div>
            <div className="w-full pl-2 text-start text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500">
              <p>Overview</p>
            </div>
            <p className="pl-2 text-lg text-start">{overview}</p>
            {typeof noteOnIndie === 'string' && (
              <>
                <div className="w-full pl-2 text-start text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500">
                  <p>Indie vibes check</p>
                </div>
                <p className="pl-2 text-lg text-start">{noteOnIndie}</p>
              </>
            )}
          </div>
        </div>
        <div className="w-full min-h-96 p-4 rounded-xl bg-gray-900 bg-opacity-60 shadow-md">
          <SimilarFilmsBox title={title} genres={genres} filmData={filmData} />
        </div>
      </section>
    </main>
  );
}
