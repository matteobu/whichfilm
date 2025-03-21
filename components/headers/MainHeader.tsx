import Image from 'next/image';
import Link from 'next/link';
import NavLink from './NavLink';
import { PiFilmReel } from 'react-icons/pi';
import { MdOutlineFestival } from 'react-icons/md';
import {
  FaCircleInfo,
  FaDiscord,
  FaEnvelope,
  FaGithub,
  FaInstagram,
} from 'react-icons/fa6';
import { GiPopcorn } from 'react-icons/gi';

export default function MainHeader() {
  return (
    <header className="bg-gradient-dark-gray-blue text-white p-3 sticky top-0 z-50 border-b-1 border-pink-500">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex space-x-2 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="whichfilm Logo"
              width={20}
              height={20}
              className="sm:w-10 sm:h-10"
            />
            <span className="text-pink-500 font-bold text-xl sm:text-2xl hidden sm:inline">
              which film ?
            </span>
            <span className="text-pink-500 font-bold text-xl sm:text-2xl sm:hidden">
              wf?
            </span>
          </Link>
        </div>
        <nav>
          <ul className="flex space-x-6 items-center h-full">
            <NavLink href="/film-search">
              <PiFilmReel className="text-xl sm:hidden" />
              <span className="hidden sm:inline">films</span>
            </NavLink>
            <NavLink href="/film-festival">
              <MdOutlineFestival className="text-xl sm:hidden" />
              <span className="hidden sm:inline">film festivals</span>
            </NavLink>
            <NavLink href="/about">
              <FaCircleInfo className="text-xl sm:hidden" />
              <span className="hidden sm:inline">about</span>
            </NavLink>
            <div
              className="relative w-[70px] h-[40px] flex items-center justify-center rounded-xl
  group transition-all duration-500 ease-in-out hover:w-[120px] hover:z-10"
            >
              <span className="text-gray-700 font-bold transition-opacity duration-300 group-hover:opacity-0">
                contacts
              </span>
              <div
                className="h-[40px] absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity duration-300 
    group-hover:opacity-100"
              >
                <NavLink href="https://github.com/matteobu/whichfilm">
                  <FaGithub size={20} style={{ color: '#9d174d' }} />
                </NavLink>
                <NavLink href="mailto:whichfilm@pm.me">
                  <FaEnvelope size={20} style={{ color: '#9d174d' }} />
                </NavLink>
                <NavLink href="https://www.instagram.com/ehi.matteo/">
                  <FaInstagram size={20} style={{ color: '#9d174d' }} />
                </NavLink>
                <NavLink href="https://discord.gg/BEHSKHP8">
                  <FaDiscord size={20} style={{ color: '#9d174d' }} />
                </NavLink>
              </div>
            </div>
          </ul>
        </nav>
      </div>
    </header>
  );
}
