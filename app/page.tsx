import Link from 'next/link';
import SearchInput from '../components/SearchInput';
import SecondMainHeader from '../components/headers/SecondMainHeader';

export default function Home() {
  return (
    // <main className="bg-gradient-dark-violet min-h-screen flex flex-col items-center text-white py-10">
    <main className="bg-red-400 min-h-screen flex flex-col items-center text-white py-10">
      <SearchInput />

      {/* Future Components Section */}
      <div className="flex flex-col items-center space-y-6">
        <p className="text-xl text-pink-300">
          Other components will appear here.
        </p>
      </div>
    </main>
  );
}
