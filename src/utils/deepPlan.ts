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

<<<<<<< HEAD
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
=======
const demoAnalysis: DeepPlanAnalysis = {
  marketAnalysis: {
    marketSize: "Estimated $5B annual market size",
    competitors: [
      "Existing Project Management Tools",
      "Traditional Development Platforms",
      "AI-assisted Development Tools"
    ],
    uniqueSellingPoints: [
      "Integrated AI-powered ideation",
      "End-to-end project planning",
      "Developer-centric approach",
      "Automated technical analysis"
    ],
    growthPotential: "High growth potential in the AI-assisted development tools market"
  },
  technicalRequirements: {
    frontendStack: ["React", "TypeScript", "Tailwind CSS"],
    backendStack: ["Node.js", "Express", "PostgreSQL"],
    infrastructure: ["AWS", "Docker", "CI/CD Pipeline"],
    thirdPartyServices: ["Auth0", "Stripe", "OpenAI API"],
    estimatedComplexity: "Medium"
  },
  timeline: [
    {
      phase: "MVP Development",
      duration: "3 months",
      keyMilestones: [
        "Core ideation engine",
        "Basic project planning features",
        "User authentication",
        "Initial UI/UX implementation"
      ]
    },
    {
      phase: "Beta Testing",
      duration: "2 months",
      keyMilestones: [
        "Private beta launch",
        "User feedback collection",
        "Performance optimization",
        "Bug fixes and improvements"
      ]
    },
    {
      phase: "Public Launch",
      duration: "1 month",
      keyMilestones: [
        "Marketing campaign",
        "Public release",
        "Community building",
        "Support system setup"
      ]
    }
  ],
  budget: {
    developmentCosts: "$150,000",
    infrastructureCosts: "$25,000",
    marketingCosts: "$50,000",
    totalEstimate: "$225,000",
    monthlyRunningCosts: "$5,000"
  },
  monetization: {
    model: "Freemium with Premium Tiers",
    pricingTiers: [
      {
        name: "Free",
        price: "$0/month",
        features: [
          "Basic idea generation",
          "Limited projects",
          "Community support"
        ]
      },
      {
        name: "Pro",
        price: "$29/month",
        features: [
          "Advanced AI analysis",
          "Unlimited projects",
          "Priority support",
          "Export capabilities"
        ]
      },
      {
        name: "Enterprise",
        price: "Custom",
        features: [
          "Custom integrations",
          "Team collaboration",
          "Dedicated support",
          "Advanced analytics"
        ]
      }
    ],
    revenueProjection: "Estimated $1M ARR within first year"
  },
  developerPrompt: "Create a modern web application for AI-powered software ideation and project planning. Focus on user experience, scalability, and integration capabilities. Implement robust security measures and ensure high performance."
};

const systemPrompt = `You are an expert software project analyst. Analyze the provided software idea and generate a comprehensive development plan.
Focus on practical, actionable insights and realistic estimates. Structure your response in JSON format matching the DeepPlanAnalysis interface.
Ensure all estimates and recommendations are based on current market standards and industry best practices.`;
>>>>>>> 3e628a2168b56fec3281130d34c634e61e91a332

export async function generateDeepPlanAnalysis(idea: SoftwareIdea): Promise<DeepPlanAnalysis> {
  if (!GROQ_API_KEY) {
    console.warn('Running in demo mode. Add GROQ API key to enable AI features.');
<<<<<<< HEAD
    return Promise.reject(new Error('GROQ API key is required'));
=======
    return Promise.resolve(demoAnalysis);
>>>>>>> 3e628a2168b56fec3281130d34c634e61e91a332
  }

  const prompt = `Analyze this software idea and provide a detailed development plan:
Name: ${idea.name}
Description: ${idea.description}
Purpose: ${idea.purpose}
Target Audience: ${idea.targetAudience}
Key Features: ${idea.keyFeatures.join(', ')}

Provide a comprehensive analysis including market analysis, technical requirements, timeline, budget, and monetization strategy.
<<<<<<< HEAD
Return the response as a JSON object matching the DeepPlanAnalysis interface.`;
=======
Format the response as a JSON object matching the DeepPlanAnalysis interface.`;
>>>>>>> 3e628a2168b56fec3281130d34c634e61e91a332

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