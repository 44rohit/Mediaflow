import { NextResponse } from 'next/server';

const GEMINI_API_KEY = 'AIzaSyAwLd49RvKB3X2cAfmVz0vKJ-IzAPGabdo';
const GEMINI_MODEL = 'gemini-2.0-flash';

const SYSTEM_PROMPT = `You are the official MediaFlow Help Desk AI assistant. MediaFlow is a smart media marketing platform for local businesses in India.

Your role:
- Help users understand MediaFlow's services: Social Media Marketing, Digital Marketing Strategies, Creative Design, E-Commerce, Influencer Marketing, Analytics & Reporting
- Explain pricing plans: Starter (₹9,999/campaign), Growth (₹24,999/month), Enterprise (₹49,999/month)
- Guide users on how to register, submit campaigns, track analytics, and use the dashboard
- Help with questions about campaigns, performance tracking, and ROI
- Assist with account and login issues

Rules:
- ONLY answer questions related to MediaFlow and its services
- If asked anything unrelated (general knowledge, coding, science, etc.), politely say: "I'm MediaFlow's help assistant and can only help with questions about our platform and services. How can I assist you with MediaFlow today?"
- Be concise, friendly, and professional
- Respond in the same language the user is using (English or Hindi)
- Always encourage users to sign up or contact the team for personalized help`;

async function callGemini(contents, retries = 2) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  for (let attempt = 0; attempt <= retries; attempt++) {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 512,
        },
      }),
    });

    if (response.status === 429 && attempt < retries) {
      await new Promise(r => setTimeout(r, 2000 * (attempt + 1)));
      continue;
    }

    return response;
  }
}

export async function POST(request) {
  try {
    const { messages } = await request.json();

    const systemTurn = [
      {
        role: 'user',
        parts: [{ text: `[SYSTEM INSTRUCTIONS — FOLLOW STRICTLY]:\n${SYSTEM_PROMPT}` }],
      },
      {
        role: 'model',
        parts: [{ text: 'Understood. I am the MediaFlow Help Desk AI. I will only assist with MediaFlow-related questions.' }],
      },
    ];

    const userContents = messages.map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));

    const response = await callGemini([...systemTurn, ...userContents]);

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      console.error(`Gemini ${response.status}:`, errData);

      if (response.status === 429) {
        return NextResponse.json(
          { error: '⏳ The assistant is busy right now. Please wait a moment and try again.' },
          { status: 429 }
        );
      }
      return NextResponse.json(
        { error: `API error ${response.status}: ${errData?.error?.message || 'Unknown error'}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.error('No text in Gemini response:', JSON.stringify(data));
      return NextResponse.json({ error: 'No response generated. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({ text });
  } catch (err) {
    console.error('Chat API route error:', err);
    return NextResponse.json({ error: '⚠️ Server error. Please try again.' }, { status: 500 });
  }
}
