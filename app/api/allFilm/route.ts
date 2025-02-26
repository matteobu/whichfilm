import sql from 'better-sqlite3';
import { NextResponse } from 'next/server';

const db = sql('film_indie.db');

// This function is synchronous so no need for async/await
export function getAllFilms() {
  return db.prepare('SELECT * FROM film').all();
}

// Handle the GET request
export function GET() {
  try {
    const results = getAllFilms(); // Synchronous, no need for await
    return NextResponse.json(results); // Return films as JSON
  } catch (error) {
    // If an error occurs, return a 500 response with an error message
    return NextResponse.json(
      { error: 'Errore nel recupero dei film' },
      { status: 500 }
    );
  }
}
