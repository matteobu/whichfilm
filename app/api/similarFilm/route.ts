import { NextRequest, NextResponse } from 'next/server';
import { OramaClient } from '@oramacloud/client';

export async function POST(req: NextRequest) {
  try {
    const { title, genres } = await req.json();

    if (!title || !genres) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const client = new OramaClient({
      endpoint: 'https://cloud.orama.run/v1/indexes/film-oofphg',
      api_key: process.env.ORAMA_API_KEY,
    });

    const answerSession = client.createAnswerSession({
      userContext: {
        context: 'The user is a film nerd.',
        filmTaste: genres,
      },
      inferenceType: 'documentation',
    });

    const answer = await answerSession.ask({
      term: `Find me a similar film to ${title}`,
    });

    return NextResponse.json({ answer });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
