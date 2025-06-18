import { GeminiApiSteps } from "./api/geminiApiSteps";
import { step } from "../util/testDecorators";
import { AxeResults, NodeResult, Result } from "axe-core";
import { AccessibilityReportContext, TestInfo } from "../fixtures/testFixtures";
import { JiraApiSteps } from "./api/jiraApiSteps";
import { ConfigurationData } from "../config/configurationData";

interface SimplifiedNodeResult {
  selector: string;
  htmlSnippet: string; // A snippet of the problematic HTML
  failureSummary: string; // Specific details about why this node failed
}

interface SimplifiedViolationResult {
  id: string; // Rule ID (e.g., "color-contrast-enhanced")
  impact?: string | null; // e.g., "serious"
  description: string; // General description of the rule
  help: string; // General help text for the rule
  helpUrl: string; // URL for more detailed information on the rule
  tags: string[]; // Associated tags (e.g., ["cat.color", "wcag2aaa"])
  affectedElements: SimplifiedNodeResult[]; // List of specific elements failing this rule
}

export class ReportingSteps {
  private readonly geminiApiSteps: GeminiApiSteps;
  private readonly jiraApiSteps: JiraApiSteps;
  // Configurable limits to manage prompt size and API costs
  private readonly MAX_VIOLATIONS_TO_SEND = 5; // Max number of violation *rules*
  private readonly MAX_NODES_PER_VIOLATION_TO_SEND = 3; // Max *affected elements* per rule
  private readonly MAX_HTML_SNIPPET_LENGTH = 500; // Max length for HTML snippets

  constructor(geminiApiSteps: GeminiApiSteps, jiraApiSteps: JiraApiSteps) {
    this.geminiApiSteps = geminiApiSteps;
    this.jiraApiSteps = jiraApiSteps;
  }

  @step("Attach accessibility scan results")
  async attachAccessibilityScanResults(
    testInfo: TestInfo,
    accessibilityReportContext: AccessibilityReportContext,
  ) {
    if (!accessibilityReportContext.results) return;
    await testInfo.attach("Accessibility complete scan results", {
      body: JSON.stringify(accessibilityReportContext.results, null, 2),
      contentType: "application/json",
    });
    if (!accessibilityReportContext.results.violations) return;
    let accessibilityScanResultSummary = this.formatViolationsForAiPromt(
      accessibilityReportContext.results.violations,
    );
    await testInfo.attach("Accessibility scan results: violations only", {
      body: accessibilityScanResultSummary,
      contentType: "text/plain",
    });
  }

  @step("Attach AI-analyzed accessibility recommendations")
  async attachAiAnalyzedAccessibilityReport(
    testInfo: TestInfo,
    accessibilityReportContext: AccessibilityReportContext,
  ) {
    if (
      !accessibilityReportContext.results ||
      accessibilityReportContext.results.violations.length === 0
    )
      return;
    console.log("Requesting AI recommendations...");
    const analyzedResults = await this.getGeminiAiRecommendations(
      accessibilityReportContext.results,
    );
    await testInfo.attach("Accessibility AI recommendations", {
      body: analyzedResults,
      contentType: "text/html",
    });
  }

  @step("Request accessibility recommendations from Google Gemini AI")
  async getGeminiAiRecommendations(accessibilityScanResults: AxeResults) {
    return await this.geminiApiSteps.getGeminiAiRecommendations(
      this.getPromtTextForAccessibilityScanResults(accessibilityScanResults),
    );
  }

  @step("Create Jira ticket for failed test")
  async createJiraTicketForFailedTest(testInfo: TestInfo) {
    let jiraTicketData = this.jiraApiSteps.createJiraBugPayload(testInfo);
    let ticketId = await this.jiraApiSteps.createJiraTicket(jiraTicketData);

    await this.attachLinkToJiraTicket(testInfo, ticketId);
  }

  @step("Attach the link to the created jira ticket")
  async attachLinkToJiraTicket(testInfo: TestInfo, ticketId: string) {
    await testInfo.attach("Link to the created Jira ticket", {
      body: `${ConfigurationData.getJiraProjectBaseUrl()}/browse/${ticketId}`,
      contentType: "text/uri-list",
    });
  }

  // --- Jira Reporting Methods ---

  private formatViolationsForAiPromt(violations: Result[]) {
    let simplifiedViolations: SimplifiedViolationResult[] = violations
      .slice(0, this.MAX_VIOLATIONS_TO_SEND) // Take top N violation rules
      .map((violation) => {
        const affectedElements: SimplifiedNodeResult[] = violation.nodes
          .slice(0, this.MAX_NODES_PER_VIOLATION_TO_SEND) // Take top M affected elements for this rule
          .map((node: NodeResult) => ({
            selector: node.target.join(", "),
            htmlSnippet:
              node.html.substring(0, this.MAX_HTML_SNIPPET_LENGTH) +
              (node.html.length > this.MAX_HTML_SNIPPET_LENGTH ? "..." : ""),
            failureSummary: node.failureSummary || "N/A",
          }));

        return {
          id: violation.id,
          impact: violation.impact,
          description: violation.description,
          help: violation.help,
          helpUrl: violation.helpUrl,
          tags: violation.tags,
          affectedElements: affectedElements,
        };
      });
    return JSON.stringify(simplifiedViolations, null, 2);
  }

  private getPromtTextForAccessibilityScanResults(
    accessibilityScanResults: AxeResults,
  ) {
    let accessibilityScanResultSummary = this.formatViolationsForAiPromt(
      accessibilityScanResults.violations,
    );
    return `
      You are an expert web accessibility consultant.
      Please review the following web accessibility violations, detected by the Axe-core automated accessibility testing tool..]
      For each violation, provide:
      1. A concise explanation of its impact on users with disabilities.
      2. Actionable recommendations on how to fix it, including code examples or specific approaches where possible.
      3. If multiple violations are present, try to group advice for similar issues or provide a prioritized list.

      Prioritize clarity and conciseness in your recommendations.
      Structure your overall response and format it as text/html for Allure report attachment. 
      Each recommendation should have reference to the original violation Id, 
      keep original description, provide impact explanation, and remediation advice.
    
      Here are the violations:
      ${accessibilityScanResultSummary}
      `;
  }
}
