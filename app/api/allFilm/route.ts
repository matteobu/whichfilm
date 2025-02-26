import sql from 'better-sqlite3';
import { NextResponse } from 'next/server';

const db = sql('film_indie.db');

export function getAllFilms() {
  return db.prepare('SELECT * FROM film').all();
}

// To use in case of request with query from the client
export async function GET() {
  try {
    const results = getAllFilms();
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { error: 'Errore nel recupero dei film' },
      { status: 500 }
    );
  }
}
