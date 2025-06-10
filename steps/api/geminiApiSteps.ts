import { BaseApiSteps } from "./baseApiSteps";
import { ConfigurationDataUtil } from "../../util/configurationDataUtil";

interface GeminiContentPart {
  text: string;
}

interface GeminiContent {
  parts: GeminiContentPart[];
  role?: string;
}

interface GeminiCandidate {
  content: GeminiContent;
  finishReason: string;
  index: number;
}

interface GeminiApiResponse {
  candidates: GeminiCandidate[];
  usageMetadata?: any;
  modelVersion?: string;
  responseId?: string;
}

export class GeminiApiSteps extends BaseApiSteps {
  private modelName = "gemini-2.5-flash-preview-05-20";
  private readonly geminiApiKey = ConfigurationDataUtil.getGeminiApiKey();

  public async getGeminiAiRecommendations(promptText: string): Promise<string> {
    const url = `models/${this.modelName}:generateContent`;
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: promptText,
            },
          ],
        },
      ],
    };
    const geminiResponse = await this.apiContext.post(url, {
      params: { key: this.geminiApiKey },
      data: JSON.stringify(requestBody),
    });

    await this.checkRequestIsSuccessful(geminiResponse);

    const data: GeminiApiResponse = await geminiResponse.json();
    return data.candidates[0].content.parts[0].text;
  }
}
