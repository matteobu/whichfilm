import { Suspense } from 'react';
import SearchAndResultsComponent from '../../components/search/SearchAndResultsComponent';

export default function FilmSearch() {
  return (
    <main
      className="bg-gradient-dark-gray-blue min-h-screen text-white p-3"
      suppressHydrationWarning={true}
    >
      <Suspense>
        <SearchAndResultsComponent />
      </Suspense>
    </main>
  );
}
