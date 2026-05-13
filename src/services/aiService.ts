import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export interface ScanResult {
  title: string;
  description: string;
  confidence: number;
  characteristics?: string[];
  firstAid?: string[];
  recommendation?: string;
}

export const identifyDogBreed = async (base64Image: string): Promise<ScanResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: base64Image,
          },
        },
        {
          text: "Identify the breed of the dog in this image. Return the result in JSON format with fields: title (breed name), description (short summary), confidence (0-1), and characteristics (array of strings).",
        },
      ],
      config: {
        responseMimeType: "application/json",
      },
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Breed Identification failed:", error);
    throw new Error("Failed to identify breed. Please try again.");
  }
};

export const identifyDisease = async (base64Image?: string, symptoms?: string): Promise<ScanResult> => {
  try {
    const parts = [];
    if (base64Image) {
      parts.push({
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Image,
        },
      });
    }
    if (symptoms) {
      parts.push({ text: `Symptoms: ${symptoms}` });
    }
    
    parts.push({
      text: "Analyze these symptoms/images for possible dog diseases/conditions. DISCLAIMER: State clearly that this is not a professional diagnosis. Provide suggested conditions, firstAid steps (array of strings), and a priority recommendation. Return as JSON with fields: title, description, confidence (0-1), firstAid, recommendation.",
    });

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts }],
      config: {
        responseMimeType: "application/json",
      },
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Disease Identification failed:", error);
    throw new Error("Failed to analyze condition. Please try again.");
  }
};
