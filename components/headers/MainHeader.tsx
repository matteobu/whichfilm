// components/headers/MainHeader.js
import Link from 'next/link';
import NavLink from './NavLink';
import { FaSearch } from 'react-icons/fa';
import { activeButtonClassName } from '../utils-components/constants';

export default function MainHeader() {
  return (
    <header className="bg-gradient-dark-violet text-white p-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Link href="/" className={activeButtonClassName}>
          Which Film ?
        </Link>
        <nav>
          <ul className="flex space-x-6 items-center h-full">
            <NavLink href="/film-search"><FaSearch /></NavLink>
            <NavLink href="/film-festival">Film Festivals</NavLink>
            <NavLink href="/directors">Directors</NavLink>
            <NavLink href="/actors">Actors</NavLink>
            <NavLink href="/feel-lucky">I feel lucky</NavLink>
            <NavLink href="/orama-search">AI’s got you</NavLink>
          </ul>
        </nav>
      </div>
    </header>
  );
}
