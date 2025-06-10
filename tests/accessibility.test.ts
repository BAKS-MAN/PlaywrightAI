import * as allure from "allure-js-commons";
import { test, TestInfo } from "../fixtures/testFixtures";
import { TestData } from "../test-data/testData";

test.use({ storageState: TestData.USER_SESSION_STATE_PATH });

test.describe("Accessibility tests for products page", { tag: "@jira" }, () => {
  test.beforeAll(async () => {
    await allure.parentSuite("Accessibility tests");
    await allure.suite("Accessibility tests for product page");
  });

  test.beforeEach(async ({ productsPageSteps }) => {
    await productsPageSteps.openProductsPage();
    await productsPageSteps.checkProductCardIsDisplayed();
  });

  test.afterEach(
    async (
      { reportingSteps, accessibilityReportContext },
      testInfo: TestInfo,
    ) => {
      await reportingSteps.attachAccessibilityScanResults(
        testInfo,
        accessibilityReportContext,
      );
      await reportingSteps.attachAiAnalyzedAccessibilityReport(
        testInfo,
        accessibilityReportContext,
      );
    },
  );

  test("Check Automatically detectable accessibility issues for product page", async ({
    accessibilitySteps,
    accessibilityReportContext,
  }) => {
    let accessibilityScanResults =
      await accessibilitySteps.getAccessibilityScanResultForProductsPage();
    await accessibilitySteps.checkAccessibilityIssues(accessibilityScanResults);
    accessibilityReportContext.results = accessibilityScanResults;
  });

  test("Check Automatically detectable accessibility issues for product card component", async ({
    accessibilitySteps,
    accessibilityReportContext,
  }) => {
    let accessibilityScanResults =
      await accessibilitySteps.getAccessibilityScanResultForProductCardComponent();
    await accessibilitySteps.checkAccessibilityIssues(accessibilityScanResults);
    accessibilityReportContext.results = accessibilityScanResults;
  });
});
