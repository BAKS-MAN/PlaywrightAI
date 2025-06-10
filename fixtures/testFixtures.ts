import * as playwrightTest from "@playwright/test";
import { AxeResults } from "axe-core";
import { HomePageSteps } from "../steps/ui/homePageSteps";
import { HomePage } from "../pages/homePage";
import { ProductsPageSteps } from "../steps/ui/productsPageSteps";
import { ProductsPage } from "../pages/productsPage";
import { AccessibilitySteps } from "../steps/ui/accessibilitySteps";
import { GeminiApiSteps } from "../steps/api/geminiApiSteps";
import { JiraApiSteps } from "../steps/api/jiraApiSteps";
import { ReportingSteps } from "../steps/reportingSteps";
import { ConfigurationDataUtil } from "../util/configurationDataUtil";

export const test = playwrightTest.test.extend<{
  geminiApiContext: APIRequestContext;
  jiraApiContext: APIRequestContext;
  accessibilityReportContext: AccessibilityReportContext;
  reportingSteps: ReportingSteps;
  geminiApiSteps: GeminiApiSteps;
  jiraApiSteps: JiraApiSteps;
  accessibilitySteps: AccessibilitySteps;
  homePageSteps: HomePageSteps;
  productsPageSteps: ProductsPageSteps;
}>({
  geminiApiContext: async ({}, use) => {
    const context = await playwrightTest.request.newContext({
      baseURL: "https://generativelanguage.googleapis.com/v1beta/",
      proxy: { server: ConfigurationDataUtil.getProxyUrl() },
    });
    await use(context);
  },
  jiraApiContext: async ({}, use) => {
    const context = await playwrightTest.request.newContext({
      baseURL: `${ConfigurationDataUtil.getJiraProjectBaseUrl()}/rest/api/3/`,
      userAgent: "PostmanRuntime/7.44.0",
      httpCredentials: {
        username: ConfigurationDataUtil.getJiraUsername(),
        password: ConfigurationDataUtil.getJiraApiKey(),
        send: "always",
      },
      proxy: { server: ConfigurationDataUtil.getProxyUrl() },
    });
    await use(context);
  },
  accessibilityReportContext: async ({}, use) => {
    const context: AccessibilityReportContext = {
      results: null,
    };
    await use(context);
  },
  reportingSteps: async ({ geminiApiSteps, jiraApiSteps }, use) => {
    await use(new ReportingSteps(geminiApiSteps, jiraApiSteps));
  },
  geminiApiSteps: async ({ geminiApiContext }, use) => {
    await use(new GeminiApiSteps(geminiApiContext));
  },
  jiraApiSteps: async ({ jiraApiContext }, use) => {
    await use(new JiraApiSteps(jiraApiContext));
  },
  accessibilitySteps: async ({ page }, use) => {
    await use(new AccessibilitySteps(new ProductsPage(page)));
  },
  homePageSteps: async ({ page }, use) => {
    await use(new HomePageSteps(new HomePage(page)));
  },
  productsPageSteps: async ({ page }, use) => {
    await use(new ProductsPageSteps(new ProductsPage(page)));
  },
});

// Raise a bug in the Jira if test failed and has tag '@jira'
test.afterEach(async ({ reportingSteps }, testInfo) => {
  const isFailed =
    testInfo.status === "failed" || testInfo.status === "timedOut";
  const shouldCreateTicket = testInfo.tags.includes("@jira");

  if (isFailed && shouldCreateTicket) {
    await reportingSteps.createJiraTicketForFailedTest(testInfo);
  }
});
export const expect = playwrightTest.expect;
export type Page = playwrightTest.Page;
export type APIRequestContext = playwrightTest.APIRequestContext;
export type APIResponse = playwrightTest.APIResponse;
export type TestInfo = playwrightTest.TestInfo;
export type AccessibilityReportContext = {
  results: AxeResults | null;
};
