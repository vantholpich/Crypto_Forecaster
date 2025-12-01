import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn("EXPO_PUBLIC_GEMINI_API_KEY is not set in the environment variables.");
}

const genAI = new GoogleGenerativeAI(API_KEY || "");

export const analyzeChart = async (base64Image: string) => {
  try {
    if (!API_KEY) {
      throw new Error("Gemini API Key is missing. Please set EXPO_PUBLIC_GEMINI_API_KEY in your .env file.");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = "You are a crypto trading expert. Analyze this chart and provide a price forecast. Be concise. Give a BUY/SELL/HOLD recommendation and a target price.";
    
    // Remove data:image/jpeg;base64, prefix if present
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");

    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: "image/jpeg",
      },
    };

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("Error analyzing chart with Gemini:", error);
    throw error;
  }
};
