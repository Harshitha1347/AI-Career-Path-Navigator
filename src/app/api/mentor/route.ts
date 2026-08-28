import Groq from 'groq-sdk';
import { NextResponse } from 'next/server';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const chat = await groq.chat.completions.create({
      model: 'openai/gpt-oss-20b',
      messages: [
        {
          role: 'system',
          content: `
You are an AI Career Mentor.

Reply ONLY in valid JSON.

Example:

{
  "goal":"AI Engineer",
  "duration":"8 Months",
  "level":"Intermediate",
  "skills":["Python","Machine Learning","Deep Learning"],
  "projects":["Spam Detector","Chatbot"],
  "roadmap":[
    "Learn Python",
    "Learn Mathematics",
    "Machine Learning",
    "Deep Learning",
    "Build Projects"
  ]
}
`,
        },
        {
          role: 'user',
          content: message,
        },
      ],
    });

    const text = chat.choices[0].message.content || '{}';

    const cleanText = text.replace(/```json|```/g, '').trim();

    let data;

try {
  data = JSON.parse(cleanText);
} catch {
  return NextResponse.json(
    {
      error: "AI returned invalid JSON",
      raw: cleanText
    },
    { status: 500 }
  );
}

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
