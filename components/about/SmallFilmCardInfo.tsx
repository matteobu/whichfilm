import React from 'react';
import SmallFilmCard from '../cards/SmallFilmCard';

const SmallCardInfo = () => {
  return (
    <>
      <h2 className="text-2xl font-extrabold text-pink-500">
        Small Film Card, what's that?
      </h2>
      <SmallFilmCard film={mockedFilmForAbout} />
      <ul className="space-y-3 text-lg text-gray-300">
        <li>
          <span className="text-2xl font-semibold text-pink-300">
            Movie Poster & Title:
          </span>{' '}
          <br></br>
          Displays the movie’s poster from TMDB.
        </li>
        <li>
          <span className="text-2xl font-semibold text-pink-300">Hover Overlay:</span>{' '}
          <br></br>
          Appears when hovered, showing:
          <ul className="list-disc ml-6 mt-1 space-y-1">
            <li>Title</li>
            <li>Indie or mainstream indicator</li>
            <li>Call-to-action for more details</li>
          </ul>
        </li>
        <li>
          <span className="text-2xl font-semibold text-pink-300">
            Indie Film Indicator:
          </span>
          <br></br>
          <span className="text-green-400 font-semibold">
            certified indie:
          </span>{' '}
          Certified indie films
          <br></br>
          <span className="text-red-400 font-semibold">
            ain't that indie:
          </span>{' '}
          Not strictly indie films
        </li>
        <li>
          <span className="text-2xl font-semibold text-pink-300">
            Vote Average Display:
          </span>{' '}
          <br></br>
          The vote is taken from TMDB with the public API. <br></br>
          Circular progress indicator showing rating:
          <ul className="list-disc ml-6 mt-1 space-y-1">
            <li className="text-blue-400">Blue: High rating (Above 7)</li>
            <li className="text-purple-400">Purple: Moderate rating (5-7)</li>
            <li className="text-red-400">Red: Low rating (Below 5)</li>
          </ul>
        </li>
      </ul>
    </>
  );
};

export default SmallCardInfo;

export const mockedFilmForAbout = {
  id: '803700',
  backdrop_path: '/xmqxG859eJbe2bJpSonJY6UazGr.jpg',
  genres: ['Drama'],
  imdb_id: 'tt14641542',
  original_language: 'it',
  origin_country: ['BE', 'FR', 'GB', 'IT'],
  original_title: 'Le otto montagne',
  overview:
    'An epic journey of friendship and self-discovery set in the breathtaking Italian Alps, The Eight Mountains follows over four decades the profound, complex relationship between Pietro and Bruno.',
  poster_path: '/ohD87uTlwOgNuUEYaW82ew9Eds7.jpg',
  release_date: '2022-12-21',
  spoken_languages: ['Nepali', 'English', 'Italian'],
  status: 'Released',
  popularity: 3.813,
  title: 'The Eight Mountains',
  tagline: '',
  vote_average: 7.637,
  vote_count: 724,
  infoIndieAndAwards: {
    cannes: {
      awards: ['Jury Prize'],
    },
    notStrictIndie: false,
    noteOnIndie:
      'A film with a small production budget and a focus on emotional storytelling, characteristic of independent cinema.',
  },
  cast: [
    {
      original_name: 'Luca Marinelli',
      profile_path: '/9Tmzfhp9hY6Zouo8KtHcyzuKfdf.jpg',
      character: 'Pietro Guasti',
    },
    {
      original_name: 'Alessandro Borghi',
      profile_path: '/cRnm7HQ84Ls6b91BONx0BrTUQXy.jpg',
      character: 'Bruno Guglielmina',
    },
    {
      original_name: 'Lupo Barbiero',
      profile_path: '/sjGd1G9qZR8I2799QKvU60VX1ez.jpg',
      character: 'Pietro (as a child)',
    },
    {
      original_name: 'Cristiano Sassella',
      profile_path: '/c5ikpXjjPOQ0KgTShAU5K8x8Ya8.jpg',
      character: 'Bruno (as a child)',
    },
    {
      original_name: 'Elisabetta Mazzullo',
      profile_path: '/bmLnRRdFsgqUkoyiXH6GRj1NpEQ.jpg',
      character: 'Lara',
    },
    {
      original_name: 'Andrea Palma',
      profile_path: '/uGGUcIcuElseBGByLnwZckPVyW2.jpg',
      character: 'Pietro (as a teenager)',
    },
    {
      original_name: 'Surakshya Panta',
      profile_path: '/iZqBS0ru63M9V8oVuhfzNYJedbM.jpg',
      character: 'Asmi',
    },
    {
      original_name: 'Elena Lietti',
      profile_path: '/bkf83iCwg7YL3uMGbFRT4QHxYNq.jpg',
      character: 'Francesca Guasti',
    },
    {
      original_name: 'Filippo Timi',
      profile_path: '/jfb21HPkVokFmzOE2kT1vnlOgAa.jpg',
      character: 'Giovanni Guasti',
    },
    {
      original_name: 'Gualtiero Burzi',
      profile_path: '/de6c5YXEOMCJNWWWZtm8d8igmS1.jpg',
      character: "Luigi, Bruno's uncle",
    },
    {
      original_name: 'Paolo Cognetti',
      profile_path: '/uf1ytQZegoEpLjc6fKQRoTT7yTd.jpg',
      character: 'Pablo',
    },
  ],
  crew: [
    {
      original_name: 'Charlotte Vandermeersch',
      profile_path: '/xriJZiU8A8E72CloWsZnsjTvZTT.jpg',
      job: 'Director',
    },
    {
      original_name: 'Felix van Groeningen',
      profile_path: '/yU4ufqZgQoFsnr1MQeU87LaatvY.jpg',
      job: 'Director',
    },
  ],
};
