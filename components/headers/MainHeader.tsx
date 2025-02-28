// components/headers/MainHeader.js
import Link from 'next/link';
import NavLink from './NavLink';
import { FaSearch } from 'react-icons/fa';
import { activeButtonClassName } from '../utils-components/constants';

export default function MainHeader() {
  return (
    <header className="bg-gradient-dark-gray-blue text-white p-3 sticky top-0 z-50 border-b-1 border-pink-500">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Link href="/" className={activeButtonClassName}>
          Which Film ?
        </Link>
        <nav>
          <ul className="flex space-x-6 items-center h-full">
            <NavLink href="/film-search">Films</NavLink>
            <NavLink href="/film-festival">Film Festivals</NavLink>
          </ul>
        </nav>
      </div>
    </header>
  );
}
