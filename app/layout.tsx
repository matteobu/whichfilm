import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import MainHeader from '../components/headers/MainHeader';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta
          name="description"
          content="Find and explore festival gems with the best independent films. Search, discover, and filter films from top global film festivals."
        />
        <meta
          name="keywords"
          content="Film Festival, Independent Films, Film Database, Film Search, Festival Films, Indie Films"
        />
        <meta name="author" content="WhichFilm App" />
        <meta
          property="og:title"
          content="WhichFilm - Discover Festival Gems"
        />
        <meta
          property="og:description"
          content="Search, discover, and filter through a curated database of festival films."
        />
        <meta property="og:image" content="/path-to-image.jpg" />
        <meta property="og:url" content="https://whichfilm-xi.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta
          name="twitter:title"
          content="WhichFilm - Discover Festival Gems"
        />
        <meta
          name="twitter:description"
          content="Find, search, and explore independent films from top festivals with WhichFilm."
        />
        <meta name="twitter:image" content="/path-to-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <title>WhichFilm - Discover Festival Gems</title>
      </head>
      <body>
        <MainHeader />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
