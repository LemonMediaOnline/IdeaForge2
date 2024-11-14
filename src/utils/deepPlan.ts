import { Groq } from 'groq-sdk';
import { SoftwareIdea } from './ideaGeneration';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const groq = new Groq({
  apiKey: GROQ_API_KEY || 'demo_key',
  dangerouslyAllowBrowser: true
});

const MODEL = 'mixtral-8x7b-32768';

export interface MarketAnalysis {
  marketSize: string;
  competitors: string[];
  uniqueSellingPoints: string[];
  growthPotential: string;
}

export interface TechnicalRequirements {
  frontendStack: string[];
  backendStack: string[];
  infrastructure: string[];
  thirdPartyServices: string[];
  estimatedComplexity: 'Low' | 'Medium' | 'High';
}

export interface Timeline {
  phase: string;
  duration: string;
  keyMilestones: string[];
}

export interface Budget {
  developmentCosts: string;
  infrastructureCosts: string;
  marketingCosts: string;
  totalEstimate: string;
  monthlyRunningCosts: string;
}

export interface MonetizationStrategy {
  model: string;
  pricingTiers: {
    name: string;
    price: string;
    features: string[];
  }[];
  revenueProjection: string;
}

export interface DeepPlanAnalysis {
  marketAnalysis: MarketAnalysis;
  technicalRequirements: TechnicalRequirements;
  timeline: Timeline[];
  budget: Budget;
  monetization: MonetizationStrategy;
  developerPrompt: string;
}

const systemPrompt = `You are an expert software project analyst. Generate a comprehensive development plan for software projects.
Your response should be a valid JSON object matching this TypeScript interface:

interface DeepPlanAnalysis {
  marketAnalysis: {
    marketSize: string;
    competitors: string[];
    uniqueSellingPoints: string[];
    growthPotential: string;
  };
  technicalRequirements: {
    frontendStack: string[];
    backendStack: string[];
    infrastructure: string[];
    thirdPartyServices: string[];
    estimatedComplexity: "Low" | "Medium" | "High";
  };
  timeline: Array<{
    phase: string;
    duration: string;
    keyMilestones: string[];
  }>;
  budget: {
    developmentCosts: string;
    infrastructureCosts: string;
    marketingCosts: string;
    totalEstimate: string;
    monthlyRunningCosts: string;
  };
  monetization: {
    model: string;
    pricingTiers: Array<{
      name: string;
      price: string;
      features: string[];
    }>;
    revenueProjection: string;
  };
  developerPrompt: string;
}

Ensure all estimates are realistic and based on current market rates.`;

export async function generateDeepPlanAnalysis(idea: SoftwareIdea): Promise<DeepPlanAnalysis> {
  if (!GROQ_API_KEY) {
    console.warn('Running in demo mode. Add GROQ API key to enable AI features.');
    return Promise.reject(new Error('GROQ API key is required'));
  }

  const prompt = `Analyze this software idea and provide a detailed development plan:
Name: ${idea.name}
Description: ${idea.description}
Purpose: ${idea.purpose}
Target Audience: ${idea.targetAudience}
Key Features: ${idea.keyFeatures.join(', ')}

Provide a comprehensive analysis including market analysis, technical requirements, timeline, budget, and monetization strategy.
Return the response as a JSON object matching the DeepPlanAnalysis interface.`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      model: MODEL,
      temperature: 0.7,
      max_tokens: 2048,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) throw new Error('No response from Groq');

    const parsedResponse = JSON.parse(response);
    
    // Ensure timeline is an array
    if (!Array.isArray(parsedResponse.timeline)) {
      parsedResponse.timeline = [];
    }

    return parsedResponse as DeepPlanAnalysis;
  } catch (error) {
    console.error('Error generating deep plan analysis:', error);
    throw new Error('Failed to generate analysis. Please try again.');
  }
}