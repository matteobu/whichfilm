import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <img src="/logo.png" alt="A server surrounded by magic sparkles." />
      <h1>Which Film?</h1>
      <Link href="/film-festival/biennale">Biennale</Link>
    </main>
  );
}
