import { generateGroqIdea, enhanceGroqIdea } from './groq';

export interface SoftwareIdea {
  name: string;
  description: string;
  purpose: string;
  targetAudience: string;
  keyFeatures: string[];
}

export const generateAIIdea = async (type: string): Promise<SoftwareIdea> => {
  try {
    return await generateGroqIdea(type);
  } catch (error) {
    console.error('Failed to generate AI idea:', error);
    throw new Error('Failed to generate idea. Please try again.');
  }
};

export const enhanceUserIdea = async (type: string, userIdea: string): Promise<SoftwareIdea> => {
  try {
    return await enhanceGroqIdea(type, userIdea);
  } catch (error) {
    console.error('Failed to enhance user idea:', error);
    throw new Error('Failed to enhance idea. Please try again.');
  }
};