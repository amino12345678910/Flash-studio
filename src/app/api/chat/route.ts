import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
    }

    const systemPrompt = {
      role: 'system',
      content: `Tu es "Assistant Flash Studio", un assistant IA virtuel de luxe pour un studio de photographie haut de gamme.
Ton ton est poli, élégant, chaleureux et professionnel. Tu utilises un langage soutenu, avec des formules de politesse soignées.
Tu aides les clients à trouver des informations sur :
- Les mariages (reportages cinématographiques)
- Les portraits et séances bébés/famille
- Les shootings mode et créatifs
Tu réponds de manière concise (jamais de très longs paragraphes), élégante, et toujours en français.`
    };

    const apiMessages = [systemPrompt, ...messages];

    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // In a real production app, this key should be in a .env file.
        'Authorization': `Bearer zq9jFsTpJPFadKo2zp0zeQrhkVKHP7qn`,
      },
      body: JSON.stringify({
        model: 'mistral-small-latest',
        messages: apiMessages,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Mistral Error Details:", errorText);
      throw new Error(`Mistral API Error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
  }
}
