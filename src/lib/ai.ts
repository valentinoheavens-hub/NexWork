import Anthropic from '@anthropic-ai/sdk';

const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

// Initialize the Anthropic client
// Note: In a production app, you should call this through a backend/Edge Function
// to keep your API key secure.
const anthropic = new Anthropic({
  apiKey: apiKey || '',
  dangerouslyAllowBrowser: true // Only for demo purposes in this environment
});

export const generateContract = async (description: string, serviceType: string) => {
  if (!apiKey) {
    throw new Error("Anthropic API Key is missing. Please add VITE_ANTHROPIC_API_KEY to your environment variables.");
  }

  const response = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20240620",
    max_tokens: 2000,
    system: "You are a professional legal assistant specializing in freelance and agency contracts. Generate a detailed, professional contract based on the provided scope. Use Markdown formatting.",
    messages: [
      {
        role: "user",
        content: `Generate a ${serviceType} contract for the following project scope: ${description}. Include sections for Scope of Work, Payment Terms, Intellectual Property, and Termination.`
      }
    ],
  });

  // Extract the text content from the response
  const content = response.content.find(c => c.type === 'text');
  return content?.type === 'text' ? content.text : '';
};

export const suggestClause = async (contractContent: string, clauseType: string) => {
  if (!apiKey) return "";

  const response = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20240620",
    max_tokens: 1000,
    system: "You are a legal assistant. Suggest a specific clause to add to an existing contract.",
    messages: [
      {
        role: "user",
        content: `Based on this contract: \n\n${contractContent}\n\nSuggest a professional "${clauseType}" clause to add.`
      }
    ],
  });

  const content = response.content.find(c => c.type === 'text');
  return content?.type === 'text' ? content.text : '';
};