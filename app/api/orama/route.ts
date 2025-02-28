import { OramaClient } from '@oramacloud/client';

export async function POST(req) {
  try {
    const { query } = await req.json();

    if (!query) {
      return Response.json({ error: 'Query is required' }, { status: 400 });
    }
    console.log('Query received');
    const orama = new OramaClient({
      endpoint: 'https://cloud.orama.run/v1/indexes/film-oofphg',
      api_key: process.env.ORAMA_API_KEY,
    });

    const answerSession = orama.createAnswerSession({
      userContext:
        'The user is a film expert searching for the next independent film to watch.',
      inferenceType: 'documentation',
      initialMessages: [
        {
          role: 'assistant',
          content: 'Orama is a next-generation answer engine',
        },
      ],
    });

    const answer = await answerSession.ask({ term: query });

    return Response.json({ answer });
  } catch (error) {
    console.error('Orama API Error:', error);
    return Response.json({ error: 'Failed to fetch answer' }, { status: 500 });
  }
}
