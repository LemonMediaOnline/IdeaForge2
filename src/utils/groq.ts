import { Groq } from 'groq-sdk';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

<<<<<<< HEAD
=======
// Allow fallback to demo mode if API key is not configured
>>>>>>> 3e628a2168b56fec3281130d34c634e61e91a332
const groq = new Groq({
  apiKey: GROQ_API_KEY || 'demo_key',
  dangerouslyAllowBrowser: true
});

const MODEL = 'mixtral-8x7b-32768';

const systemPrompt = `You are an expert software ideation assistant. Generate innovative yet practical software ideas.
Your responses should be structured exactly like this example:

name: TaskFlow Pro
description: A smart task management system that uses AI to automatically prioritize and organize tasks based on deadlines, dependencies, and user work patterns. It integrates with popular calendar apps and uses machine learning to predict task completion times.
purpose: To eliminate the stress of task management by providing intelligent automation and insights that help users work more efficiently.
target audience: Professionals and teams who struggle with complex task management and need a smarter way to organize their work.
features:
1. AI-powered task prioritization
2. Smart deadline predictions
3. Calendar integration with conflict detection
4. Automated task dependencies mapping
5. Personal productivity insights dashboard`;

<<<<<<< HEAD
export async function generateGroqIdea(type: string): Promise<any> {
  if (!GROQ_API_KEY) {
    console.warn('Running in demo mode. Add GROQ API key to enable AI features.');
    return Promise.reject(new Error('GROQ API key is required'));
=======
// Mock response for demo mode
const demoResponse = {
  name: "IdeaForge Demo",
  description: "This is a demo version. To enable AI-powered idea generation, please configure your GROQ API key in the .env file.",
  purpose: "To demonstrate the application's functionality without requiring an API key.",
  targetAudience: "Developers testing the application",
  keyFeatures: [
    "Demo mode functionality",
    "UI/UX preview",
    "Sample idea generation",
    "Local storage integration",
    "Basic feature showcase"
  ]
};

export async function generateGroqIdea(type: string): Promise<any> {
  if (!GROQ_API_KEY) {
    console.warn('Running in demo mode. Add GROQ API key to enable AI features.');
    return Promise.resolve(demoResponse);
>>>>>>> 3e628a2168b56fec3281130d34c634e61e91a332
  }

  const prompt = `Create a unique ${type} concept that solves real problems.
Focus on current market needs and technical feasibility.
Make it innovative but practical to implement.
Structure the response exactly like the example format.`;
  
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      model: MODEL,
      temperature: 0.8,
      max_tokens: 1024,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) throw new Error('No response from Groq');

    return parseGroqResponse(response);
  } catch (error) {
    console.error('Error generating idea:', error);
    throw error;
  }
}

export async function enhanceGroqIdea(type: string, userIdea: string): Promise<any> {
  if (!GROQ_API_KEY) {
    console.warn('Running in demo mode. Add GROQ API key to enable AI features.');
<<<<<<< HEAD
    return Promise.reject(new Error('GROQ API key is required'));
=======
    return Promise.resolve({
      ...demoResponse,
      description: `Enhanced demo for: ${userIdea}`
    });
>>>>>>> 3e628a2168b56fec3281130d34c634e61e91a332
  }

  const prompt = `Enhance this ${type} idea: "${userIdea}"
Make it unique and valuable while keeping its core concept.
Add specific, implementable features.
Structure the response exactly like the example format.`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      model: MODEL,
      temperature: 0.8,
      max_tokens: 1024,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) throw new Error('No response from Groq');

    return parseGroqResponse(response);
  } catch (error) {
    console.error('Error enhancing idea:', error);
    throw error;
  }
}

function parseGroqResponse(response: string): any {
  try {
    const lines = response.split('\n');
    const result = {
      name: '',
      description: '',
      purpose: '',
      targetAudience: '',
      keyFeatures: [] as string[]
    };

    let currentSection = '';
    
    for (const line of lines) {
      if (line.toLowerCase().startsWith('name:')) {
        result.name = line.substring(5).trim();
      } else if (line.toLowerCase().startsWith('description:')) {
        result.description = line.substring(12).trim();
      } else if (line.toLowerCase().startsWith('purpose:')) {
        result.purpose = line.substring(8).trim();
      } else if (line.toLowerCase().startsWith('target audience:')) {
        result.targetAudience = line.substring(15).trim();
      } else if (line.toLowerCase().startsWith('features:')) {
        currentSection = 'features';
      } else if (currentSection === 'features' && line.trim()) {
        // Remove number prefix if it exists and trim
        const feature = line.replace(/^\d+\.\s*/, '').trim();
        if (feature) {
          result.keyFeatures.push(feature);
        }
      }
    }

    // Validate the result
    if (!result.name || !result.description || !result.purpose || !result.targetAudience || result.keyFeatures.length === 0) {
      throw new Error('Invalid response format');
    }

    return result;
  } catch (error) {
    console.error('Error parsing Groq response:', error);
    throw new Error('Failed to parse AI response');
  }
}