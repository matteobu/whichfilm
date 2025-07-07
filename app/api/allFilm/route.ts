import { NextResponse } from 'next/server';
import { OramaClient } from '@oramacloud/client';

export async function GET() {
  try {
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
      term: '',
      limit: 200,  
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
