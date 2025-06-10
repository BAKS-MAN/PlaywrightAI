import { BaseApiSteps } from "./baseApiSteps";
import { step } from "../../util/testDecorators";
import { expect, TestInfo } from "../../fixtures/testFixtures";
import { AdfBuilder } from "../../util/jiraAdfUtils";

interface AdfTextNode {
  type: "text";
  text: string;
  marks?: { type: "strong" | "em" }[]; // "strong" is bold, "em" is italic
}

interface AdfHardBreakNode {
  type: "hardBreak"; // for a new line
}

type AdfContentNode = AdfTextNode | AdfHardBreakNode;

export interface AdfParagraph {
  type: "paragraph";
  content: AdfContentNode[];
}

export interface AdfCodeBlock {
  type: "codeBlock";
  attrs?: { language: string };
  content: [AdfTextNode];
}

export interface AtlassianDocumentFormat {
  version: 1;
  type: "doc";
  content: (AdfParagraph | AdfCodeBlock)[];
}

export interface JiraIssueDto {
  fields: {
    project: { id: string };
    issuetype: { id: string };
    summary: string;
    description: AtlassianDocumentFormat;
    reporter: { id: string };
    labels: string[];
    // Add other fields like priority or fixVersions if they can vary
    [key: string]: any; // Allows for other fields if needed
  };
}

interface JiraCreateResponse {
  id: string;
  key: string;
  self: string;
}

export class JiraApiSteps extends BaseApiSteps {
  /**
   * Creates a new issue in Jira.
   * @param jiraIssueData - The DTO representing the issue.
   * @returns The issue key (e.g., "TST-9").
   */
  @step("Send POST request to create Jira ticket")
  async createJiraTicket(jiraIssueData: JiraIssueDto): Promise<string> {
    const apiResponse = await this.apiContext.post("./issue", {
      data: jiraIssueData,
      timeout: 60000,
    });
    await this.checkRequestIsSuccessful(apiResponse);

    const responseBody: JiraCreateResponse = await apiResponse.json();
    expect(
      responseBody.key,
      "The response body did not contain an issue key.",
    ).toBeDefined();

    console.log(`Successfully created Jira issue: ${responseBody.key}`);
    return responseBody.key;
  }

  /**
   * Creates a Jira issue payload with fixed project, issuetype, and reporter.
   * @returns A JiraIssueDto object ready for the API request.
   * @param testInfo
   */
  createJiraBugPayload(testInfo: TestInfo): JiraIssueDto {
    let summary: string = `[AQA] Test failed: ${testInfo.title}`;
    let actualResult: string = testInfo.error.stack.split("\n")[0].trim();

    let description = new AdfBuilder()
      .addParagraph("Expected Result:", "No issues detected")
      .addParagraph("Actual Result:", actualResult)
      .build();

    return {
      fields: {
        summary: summary,
        description: description,
        priority: {
          name: "High",
        },
        project: { id: "10000" }, // Fixed project ID for "Testathlon2025"
        issuetype: { id: "10009" }, // Fixed issuetype for "Bug"
        reporter: { id: "712020:ce45759f-1649-4679-a742-3dd307683dce" }, // Fixed reporter ID for "sergey bykov"
        labels: ["AQA", "Accessibility"],
      },
    };
  }
}
