import Link from 'next/link';
import NavLink from './NavLink';
import { PiFilmReel } from 'react-icons/pi';
import { MdOutlineFestival } from 'react-icons/md';
import { FaCircleInfo } from 'react-icons/fa6';
import { AiOutlineDiscord } from 'react-icons/ai';

export default function MainHeader() {
  return (
    <header className="bg-gradient-dark-gray-blue text-white p-3 sticky top-0 z-50 border-b-1 border-pink-500">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex space-x-2 items-center">
          <Link
            href="/"
            className="text-pink-500 font-bold text-xl sm:text-2xl"
          >
            which film ?
          </Link>
        </div>

        <nav>
          <ul className="flex space-x-6 items-center h-full">
            <NavLink href="/film-search">
              <PiFilmReel className="text-xl sm:hidden" />
              <span className="hidden sm:inline">Films</span>
            </NavLink>

            <NavLink href="/film-festival">
              <MdOutlineFestival className="text-xl sm:hidden" />
              <span className="hidden sm:inline">Film Festivals</span>
            </NavLink>
            <NavLink href="/about">
              <FaCircleInfo className="text-xl sm:hidden" />
              <span className="hidden sm:inline">About</span>
            </NavLink>
            <NavLink href="https://discord.gg/BEHSKHP8">
              <AiOutlineDiscord className="text-xl sm:hidden" />
              <span className="hidden sm:inline">discord</span>
            </NavLink>
          </ul>
        </nav>
      </div>
    </header>
  );
}
