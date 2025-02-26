import sql from 'better-sqlite3';
import { OramaClient } from '@oramacloud/client';
import { NextResponse } from 'next/server';
const db = sql('film_indie.db');

export async function searchFilms(query: string) {
  const client = new OramaClient({
    endpoint: 'https://cloud.orama.run/v1/indexes/film-oofphg',
    api_key: process.env.ORAMA_API_KEY, // Use the environment variable for the API key
  });

  // Perform the search using the OramaClient
  const searchResults = await client.search({
    term: query,
    limit: 5,
    mode: 'fulltext', // You can change the search mode to suit your needs
  });
  return searchResults;
}
// export function searchFilms(query: string) {
//   console.log('QUERY Request');
//   const statement = db.prepare(
//     'SELECT * FROM film WHERE title LIKE ? LIMIT 10'
//   );
//   return statement.all(`%${query}%`);
// }

export async function GET(req: Request) {
  console.log('GET Request');
  const url = new URL(req.url);
  const query = url.searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'No query request' }, { status: 400 });
  }
  try {
    const results = await searchFilms(query);
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
