import { BaseApiSteps } from "./BaseApiSteps";
import { EnvConfig } from "../../config/env.config";
import { GoogleGenAI } from "@google/genai";
import { expect } from "../../fixtures/testFixtures";

export class GeminiApiSteps extends BaseApiSteps {
  private modelName = "gemini-3.7-flash";
  private readonly geminiApiKey = EnvConfig.getGeminiApiKey();

  public async getGeminiAiRecommendations(promptText: string): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: this.geminiApiKey });
    const response = await ai.models.generateContent({
      model: this.modelName,
      contents: promptText,
    });
    expect(
      response.text,
      `Gemini API returned an empty response. Output might be blocked by safety filters.`,
    ).toBeTruthy();
    return response.text!;
  }
}
