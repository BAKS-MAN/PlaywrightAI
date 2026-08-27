// steps/api/JiraApiSteps.ts

import { BaseApiSteps } from "./BaseApiSteps";
import { step } from "../../util/step.decorator";
import { expect, TestInfo } from "../../fixtures/testFixtures";
import { AdfBuilder } from "../../util/jira-adf.utils";
import { TIMEOUTS } from "../../util/timeouts.constants";
import { JiraCreateResponse, JiraIssueDto } from "../../dto/jira.dto";

export class JiraApiSteps extends BaseApiSteps {
  /**
   * Creates a new issue in Jira.
   * @param jiraIssueData - The DTO representing the issue.
   * @returns The issue key (e.g., "TST-9").
   */
  @step("Send POST request to create Jira ticket")
  async createJiraTicket(jiraIssueData: JiraIssueDto): Promise<string> {
    const { response, body } = await this.post<JiraCreateResponse>("./issue", {
      data: jiraIssueData,
      timeout: TIMEOUTS.SECONDS_60,
    });

    await this.checkRequestIsSuccessful(response);

    expect(
      body?.key,
      "The response body did not contain a valid Jira issue key.",
    ).toBeDefined();

    return body.key;
  }

  /**
   * Generates Jira Bug payload from test failure context.
   */
  createJiraBugPayload(testInfo: TestInfo): JiraIssueDto {
    const summary = `[AQA] Test failed: ${testInfo.title}`;
    const actualResult =
      testInfo.error?.stack?.split("\n")[0]?.trim() ??
      "No stack trace available";

    const description = new AdfBuilder()
      .addParagraph("Expected Result:", "No issues detected")
      .addParagraph("Actual Result:", actualResult)
      .build();

    return {
      fields: {
        summary,
        description,
        priority: { name: "High" },
        project: { id: "10000" }, // Fixed project ID for Demo Project"
        issuetype: { id: "10009" }, // Fixed issuetype for "Bug"
        reporter: { id: "712020:ce45759f-1649-4679-a742-3dd307683dce" }, // Fixed reporter ID for "sergey bykov"
        labels: ["AQA", "Accessibility"],
      },
    };
  }
}
