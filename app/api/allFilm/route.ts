import { NextResponse } from 'next/server';
import { OramaClient } from '@oramacloud/client';

export async function GET() {
  try {
    console.log('Fetching films...');

    if (!process.env.ORAMA_API_KEY) {
      console.error('Missing ORAMA_API_KEY in environment variables');
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
      limit: 20,
    });

    if (!results || results.hits?.length === 0) {
      console.warn('No films found from Orama API');
      return NextResponse.json({ error: 'No films found' }, { status: 404 });
    }

    console.log('Films fetched successfully:', results);
    return NextResponse.json(results);
  } catch (error) {
    console.error('API Fetch Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
