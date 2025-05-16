import { GoogleGenAI } from "@google/genai";

export async function generateComment(
  productName: string
): Promise<string | undefined> {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  const model = "gemini-2.0-flash";

  const response = await ai.models.generateContent({
    model,
    contents: `Generate a comment about a product ${productName} only 2 lines, no need to break the line`,
  });
  console.log("🚀 ~ response:", response);
  return response.text;
}
