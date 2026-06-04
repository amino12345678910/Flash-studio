import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
    }

    const systemPrompt = {
      role: 'system',
      content: `Tu es l'assistant virtuel de Flash Studio, un studio de photographie 
haut de gamme spécialisé en reportage de mariage, portraits de bébés, 
photographie de mode et séances shooting. Tu réponds toujours en 
français, avec un ton chaleureux, élégant et professionnel. Tu aides 
les visiteurs à découvrir les services, donner des informations sur les 
séances, et les inviter à réserver via le formulaire de contact ou par 
téléphone au 22 255 400. Reste concis et accueillant. Si tu ne connais 
pas un tarif précis, invite poliment à demander un devis personnalisé.`
    };

    const apiMessages = [systemPrompt, ...messages];

    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer zq9jFsTpJPFadKo2zp0zeQrhkVKHP7qn`,
      },
      body: JSON.stringify({
        model: 'mistral-small-latest',
        messages: apiMessages,
        temperature: 0.7,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Mistral Error Details:", errorText);
      throw new Error(`Mistral API Error: ${response.status}`);
    }

    // Return the stream directly to the client
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
  }
}
