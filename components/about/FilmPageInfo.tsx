import React from 'react';
import Image from 'next/image';

export default function FilmPageInfo() {
  return (
    <>
      <h2 className="text-2xl font-semibold text-pink-500">
        Film Page, what's inside?
      </h2>
      <ul className="space-y-6 text-lg text-gray-300">
        <li>
          <span className="text-2xl font-semibold text-pink-300">
            Backdrop & Details:
          </span>{' '}
          <br />
          Displays the movie’s backdrop, genre, language, release year, average
          TMDB vote and the awards.
          <br />
          <Image
            src="/images/backdrop-info.png"
            alt="Backdrop & Details"
            width={300}
            height={150}
            className="rounded-lg mt-2"
          />
        </li>
        <li>
          <span className="text-2xl font-semibold text-pink-300">
            Film Overview:
          </span>{' '}
          <br />
          Brief summary of the film's plot.
          <br />
          <Image
            src="/images/overview-info.png"
            alt="Film Overview"
            width={300}
            height={150}
            className="rounded-lg mt-2"
          />
        </li>
        <li>
          <span className="text-2xl font-semibold text-pink-300">Trailer:</span>{' '}
          <br />
          Embedded YouTube trailer (if available).
          <br />
          <Image
            src="/images/youtube-info.png"
            alt="Trailer"
            width={300}
            height={150}
            className="rounded-lg mt-2"
          />
        </li>
        <li>
          <span className="text-2xl font-semibold text-pink-300">
            Cast & Crew:
          </span>{' '}
          <br />
          Key actors and crew members featured prominently.
          <br />
          <Image
            src="/images/cast-crew-info.png"
            alt="Cast & Crew"
            width={300}
            height={150}
            className="rounded-lg mt-2"
          />
        </li>
        <li>
          <span className="text-2xl font-semibold text-pink-300">
            Orama Integration:
          </span>
          <br />
          <p>
            The Film Page utilizes Orama to enhance film discovery, helping you
            find similar movies with ease. By analyzing genres and key details,
            Orama ensures a rich and immersive search experience.
          </p>
          <Image
            src="/images/orama-info.png"
            alt="Orama Integration"
            width={300}
            height={150}
            className="rounded-lg mt-2"
          />
          <Image
            src="/images/orama-info-2.png"
            alt="Orama Integration"
            width={300}
            height={150}
            className="rounded-lg mt-2"
          />
        </li>
      </ul>
    </>
  );
}
