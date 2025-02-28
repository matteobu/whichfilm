import { OramaClient } from '@oramacloud/client';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const query = url.searchParams.get('query');

    if (!query) {
      return NextResponse.json({ error: 'No query request' }, { status: 400 });
    }

    if (!process.env.ORAMA_API_KEY) {
      return NextResponse.json(
        { error: 'Server misconfiguration: Missing API key' },
        { status: 500 }
      );
    }

    const client = new OramaClient({
      endpoint: 'https://cloud.orama.run/v1/indexes/film-oofphg',
      api_key: process.env.ORAMA_API_KEY,
    });

    const results = await client.search({
      term: query,
      limit: 12,
      mode: 'fulltext',
    });

    if (!results || results.hits?.length === 0) {
      return NextResponse.json({ error: 'No films found' }, { status: 404 });
    }

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
