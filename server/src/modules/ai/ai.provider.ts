import axios from "axios";
import { env } from "../../config/env";

export class AIProvider {
  async generate(prompt: string) {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: env.AI_MODEL,
        messages: [
          {
            role: "system",
            content:
              "You are Nexora AI, an academic assistant that helps students understand technical and academic topics clearly.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${env.AI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices?.[0]?.message?.content ?? "";
  }
}

export const aiProvider = new AIProvider();