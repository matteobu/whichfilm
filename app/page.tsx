'use client';
import Image from 'next/image';
import { OramaChatBox } from '@orama/react-components';
import NavLink from '../components/headers/NavLink';
import Link from 'next/link';

export default function Home() {
  const randomIndex = Math.floor(Math.random() * h2Array.length);

  return (
    <main className="flex flex-col bg-gradient-dark-gray-blue text-white h-screen p-1">
      {/* Banner */}
      <div className="w-full h-[30vh] sm:h-[35vh] relative">
        <Image
          src="/whichfilmbanner.png"
          alt="Banner"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Main Content */}
      <div className="text-center mt-4 flex flex-col">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 m-2">
          Welcome to the Best Independent Film Database
        </h1>
        <h1 className="text-2xl font-bold text-white bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 m-2">
          Just click on{' '}
          <Link
            href="/film-search"
            className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500"
          >
            Films{' '}
          </Link>
          and hunt down that flick you’re craving!
        </h1>
      </div>
    </main>
  );
}

const h2Array = [
  'Mostly winners from indie film festivals, because participation trophies still count, right?',
  "Yeah, you heard that right. We're the 'best'. But don't get too excited, it's not like you have any better options.",
  "If you're looking for indie gems that’ll change your life, good luck. Most of them will just remind you of how much you’ve wasted your time.",
  "We've got a ton of movies, but don’t even think about asking us for some stupid thing like 'find me a movie where aliens teach a dog how to dance.'",
  'We’re not here to cater to your bad taste. But we might find something slightly better than whatever half-assed recommendation you got last time.',
  "Indie doesn't always mean 'good,' but who are we to judge your awful choices? Enjoy feeling disappointed. It's basically the indie experience.",
];
