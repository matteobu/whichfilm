import Link from 'next/link';
import NavLink from './NavLink';
import { activeClassName } from '../utils-components/constants';

export default function MainHeader() {
  return (
    <header className="bg-gradient-dark-violet text-white p-3">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Link href="/" className={activeClassName}>
          Which Film ?
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <NavLink href="/films-table">Films</NavLink>
            <NavLink href="/film-festival">Film Festivals</NavLink>
            <NavLink href="/directors">Directors</NavLink>
            <NavLink href="/actors">Actors</NavLink>
            <NavLink href="/feel-lucky">I feel lucky</NavLink>
          </ul>
        </nav>
      </div>
    </header>
  );
}
