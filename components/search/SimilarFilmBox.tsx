'use client';
import { OramaClient } from '@oramacloud/client';
import { extractAndVerifySimilarTitles } from '../../app/utils/utils';
import { useState } from 'react';
import { getFilmIdsByTitle } from '../utils-components/utils';

const SimilarFilmsBox = ({ title, genres, filmData }) => {
  const [loading, setLoading] = useState(false);
  const [similarFilms, setSimilarFilms] = useState([]);
  const [similarFilmsId, setSimilarFilmsId] = useState([]);
  const [answerReceived, setAnswerReceived] = useState(false);
  const [answer, setAnswer] = useState('');

  async function onAskToOramaHandle() {
    setLoading(true);

    try {
      const response = await fetch('/api/similarFilm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, genres }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch similar films');
      }

      const data = await response.json();
      const similarFilms = await extractAndVerifySimilarTitles(
        data.answer,
        title
      );
      const similarFilmsId = await getFilmIdsByTitle(similarFilms, filmData);

      setSimilarFilms(similarFilms);
      setSimilarFilmsId(similarFilmsId);
      setAnswerReceived(true);
      setAnswer(data.answer);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {!answerReceived && (
        <div className="flex items-center space-x-4">
          {loading ? (
            <>
              <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 ">
                Loading... Just a sec, Orama’s thinking!
              </h2>
            </>
          ) : (
            <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 ">
              Thirsty for more films like that?
            </h2>
          )}

          {!loading && (
            <button
              onClick={onAskToOramaHandle}
              disabled={loading || answerReceived}
              className={`text-l font-semibold px-2  py-1 rounded-xl text-white transition-transform duration-300 
             ${
               loading
                 ? 'bg-gray-600 cursor-not-allowed'
                 : 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 focus:ring-4 focus:ring-pink-300'
             }
             shadow-xl transform hover:scale-110 hover:shadow-2xl focus:outline-none`}
            >
              Ask Orama, it knows all!
            </button>
          )}
        </div>
      )}
      {answerReceived && (
        <div className="mt-4">
          {answer}
          <div className="flex items-center space-x-2 mt-2">
            <h3 className="text-xl font-semibold text-pink-500">
              similar films:
            </h3>
            {similarFilms.length > 0 ? (
              <div className="text-lg text-white align-middle">
                {similarFilms.map((film, index) => (
                  <span
                    key={index}
                    className="text-pink-300 hover:text-pink-500 align-middle"
                  >
                    <a href={`/film-search/${similarFilmsId[index]}`}>{film}</a>
                    {index < similarFilms.length - 1 && ', '}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-white">
                Looks like we’re fresh out of lookalikes for that one!
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SimilarFilmsBox;
