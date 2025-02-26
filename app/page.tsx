import Link from 'next/link';
import SecondMainHeader from '../components/headers/SecondMainHeader';
import SearchAndResultsComponent from '../components/search/SearchAndResultsComponent';

export default function Home() {
  return (
    <main className="bg-gradient-dark-violet min-h-screen text-white ">
      <SearchAndResultsComponent />
      <div className="flex flex-col items-center space-y-6 mt-8">
        <p className="text-xl text-pink-300">
          Other components will appear here.
        </p>
      </div>
    </main>
  );
}
