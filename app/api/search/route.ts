import { OramaClient } from '@oramacloud/client';
import { NextResponse } from 'next/server';

export async function searchFilms(query: string) {
  const client = new OramaClient({
    endpoint: 'https://cloud.orama.run/v1/indexes/film-oofphg',
    api_key: process.env.ORAMA_API_KEY,
  });

  const searchResults = await client.search({
    term: query,
    limit: 12,
    mode: 'fulltext',
  });
  return searchResults;
}

export async function GET(req: Request) {
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
