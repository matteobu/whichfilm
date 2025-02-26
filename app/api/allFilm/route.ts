import sql from 'better-sqlite3';
import { NextResponse } from 'next/server';
import { OramaClient } from '@oramacloud/client';

const db = sql('film_indie.db');

export async function getAllFilms() {
  const client = new OramaClient({
    endpoint: 'https://cloud.orama.run/v1/indexes/film-oofphg',
    api_key: process.env.ORAMA_API_KEY,
  });
  const results = await client.search({
    term: '',
    limit: 20,
  });
  return results;
}

export async function GET() {
  try {
    const results = await getAllFilms();
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { error: 'error on fetching films' },
      { status: 500 }
    );
  }
}
