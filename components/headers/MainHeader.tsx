import Link from 'next/link';
import logoImg from '../assets/logo.png';

export default function MainHeader() {
  return (
    <header className="bg-gradient-dark-violet text-white p-3">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 hover:text-pink-500"
        >
          {/* <img src={logoImg.src} alt="logo" className="h-12" /> */}
          Which Film ?
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link
                href="/films-table"
                className="text-lg font-semibold text-pink-300 hover:text-pink-500 transition duration-300"
              >
                Films
              </Link>
            </li>
            <li>
              <Link
                href="/film-festival"
                className="text-lg font-semibold text-pink-300 hover:text-pink-500 transition duration-300"
              >
                Film Festivals
              </Link>
            </li>
            <li>
              <Link
                href="/films-table"
                className="text-lg font-semibold text-pink-300 hover:text-pink-500 transition duration-300"
              >
                Directors
              </Link>
            </li>
            <li>
              <Link
                href="/films-table"
                className="text-lg font-semibold text-pink-300 hover:text-pink-500 transition duration-300"
              >
                Actors
              </Link>
            </li>
            <li>
              <Link
                href="/films-table"
                className="text-lg font-semibold text-pink-300 hover:text-pink-500 transition duration-300"
              >
                I feel lucky
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
