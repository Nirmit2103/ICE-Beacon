import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { symptoms, duration, knownConditions, medications, allergies } = req.body;
  if (!symptoms || !duration) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const prompt = `A patient reports: Symptoms: ${symptoms}, Duration: ${duration}, Known Conditions: ${knownConditions}, Medications: ${medications}, Allergies: ${allergies}.
What could be the possible issues? Give suggestions in simple terms.`;
  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    console.log('Groq API status:', groqRes.status);

    if (!groqRes.ok) {
      const error = await groqRes.json();
      console.error('Groq API error:', error);
      return res.status(500).json({ error: error.error?.message || 'Groq API error' });
    }

    const data = await groqRes.json();
    console.log('Groq API response:', data);
    console.log('Groq message:', data.choices[0].message);

    res.status(200).json({ diagnosis: data.choices[0].message.content });
  } catch (error: any) {
    console.error('Groq API error:', error);
    res.status(500).json({ error: error.message || 'Failed to get diagnosis' });
  }
} 
