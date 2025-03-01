// components/headers/MainHeader.js
import Link from 'next/link';
import NavLink from './NavLink';
import { FaSearch } from 'react-icons/fa';
import { activeButtonClassName } from '../utils-components/constants';

export default function MainHeader() {
  return (
    <header className="bg-gradient-dark-gray-blue text-white p-3 sticky top-0 z-50 border-b-1 border-pink-500">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex space-x-2 items-center">
          <Link href="/" className="text-pink-500 font-bold text-xl">
            which film ?
          </Link>
          <span className="text-l font-bold text-transparent bg-gradient-pink-purple-blue-text">
            welcome to the best independent film database
          </span>
        </div>
        <nav>
          <ul className="flex space-x-6 items-center h-full">
            <NavLink href="/film-search">films</NavLink>
            <NavLink href="/film-festival">film festivals</NavLink>
            <NavLink href="/about">about</NavLink>
          </ul>
        </nav>
      </div>
    </header>
  );
}
