import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY, GEMINI_MODELS, PINECONE_API_KEY, PINECONE_INDEX, PINECONE_NAMESPACE, SYSTEM_INSTRUCTIONS } from "@/env";
import { Pinecone } from "@pinecone-database/pinecone";

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function chatbotService(query: string): Promise<string> {
  const context = await retrieveContext(query);

  const promptText = `
    INSTRUCTIONS:
    ${SYSTEM_INSTRUCTIONS}

    CONTEXT:
    ${context}

    QUESTION:
    ${query}
  `.trim();

  // Split the comma-separated models string into an array
  const models = GEMINI_MODELS.split(",").map((m) => m.trim());

  for (const model of models) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: [
          {
            role: "user",
            parts: [{ text: promptText }],
          },
        ],
      });

      if (response.text) {
        return response.text;
      }
    } catch (err) {
      console.warn(`Model ${model} failed: ${err}`);
    }
  }

  return "Sorry, I couldn't generate a response at this time."; 
}
const pinecone = new Pinecone({
  apiKey: PINECONE_API_KEY,
});

export async function retrieveContext(query: string): Promise<string> {
  const index = pinecone.index(PINECONE_INDEX).namespace(PINECONE_NAMESPACE);

  const results = await index.searchRecords({
    query: {
      topK: 10,
      inputs: { text: query },
    },
  });

  // Combine all text fields in each hit
  const context = results.result.hits
    .map((hit) => {
      const fields = hit.fields ?? {};
      // Return the first string field, or join all string fields
      return Object.values(fields)
        .filter((v) => typeof v === "string")
        .join(" ");
    })
    .filter(Boolean)
    .join("\n");

  return context || `
    Jack Branston is a software engineer with experience in backend systems and APIs.
    He has worked with TypeScript, Node.js, and cloud-based services.
`.trim();
}
