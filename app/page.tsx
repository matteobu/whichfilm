import Link from 'next/link';

export default function Home() {
  return (
    <main className="bg-gradient-dark-violet min-h-screen flex flex-col items-center justify-center text-white py-10">
      <div className="text-center">
        <img
          src="/logo.png"
          alt="A server surrounded by magic sparkles."
          className="w-32 h-32 mb-6 animate-pulse"
        />
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 mb-6">
          Which Film?
        </h1>
        <Link
          href="/films-table/"
          className="text-xl font-semibold text-pink-300 hover:text-pink-500 transition duration-300"
        >
          FILMS
        </Link>
      </div>
    </main>
  );
}
