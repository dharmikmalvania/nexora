import { aiProvider } from "./ai.provider";
import { ExplainInput } from "./ai.validation";

export class AIService {
  async explain(data: ExplainInput) {
    const prompt = `
Explain the following topic to an MCA student.

Topic:
${data.topic}

Requirements:
- Start with a simple definition.
- Explain the core concept.
- Give a practical example.
- Mention important points to remember.
- Keep the explanation clear and structured.
`;

    const answer = await aiProvider.generate(prompt);

    return {
      topic: data.topic,
      answer,
    };
  }
}

export const aiService = new AIService();