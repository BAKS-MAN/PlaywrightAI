import * as allure from "allure-js-commons";
import { test, TestInfo } from "../fixtures/testFixtures";
import { TestData } from "../test-data/testData";

test.use({ storageState: TestData.USER_SESSION_STATE_PATH });

test.describe("Accessibility tests for tariff pages", { tag: "@axe" }, () => {
  test.beforeAll(async () => {
    await allure.parentSuite("Accessibility tests");
    await allure.suite("Accessibility tests for tariff and devices pages");
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
      // await reportingSteps.attachAiAnalyzedAccessibilityReport(
      //   testInfo,
      //   accessibilityReportContext,
      // );
    },
  );

  test("Check Automatically detectable accessibility issues for the shop page", async ({
    shopPageSteps,
    accessibilitySteps,
    accessibilityReportContext,
  }) => {
    await shopPageSteps.openShopPage();
    let accessibilityScanResults =
      await accessibilitySteps.getAccessibilityScanResultForCurrentPage();
    await accessibilitySteps.checkAccessibilityIssues(accessibilityScanResults);
    accessibilityReportContext.results = accessibilityScanResults;
  });

  test("Check Automatically detectable accessibility issues for the smartphone tariffs page", async ({
    smartphoneTariffsPageSteps,
    accessibilitySteps,
    accessibilityReportContext,
  }) => {
    await smartphoneTariffsPageSteps.openSmartphoneTariffsPage();
    await smartphoneTariffsPageSteps.checkTariffCarouselIsDisplayed();
    let accessibilityScanResults =
      await accessibilitySteps.getAccessibilityScanResultForCurrentPage();
    await accessibilitySteps.checkAccessibilityIssues(accessibilityScanResults);
    accessibilityReportContext.results = accessibilityScanResults;
  });

  test("Check Automatically detectable accessibility issues for the prepaid tariffs page", async ({
    prepaidTariffPageSteps,
    accessibilitySteps,
    accessibilityReportContext,
  }) => {
    await prepaidTariffPageSteps.openPrepaidTariffsPage();
    await prepaidTariffPageSteps.checkTariffCarouselIsDisplayed();
    let accessibilityScanResults =
      await accessibilitySteps.getAccessibilityScanResultForCurrentPage();
    await accessibilitySteps.checkAccessibilityIssues(accessibilityScanResults);
    accessibilityReportContext.results = accessibilityScanResults;
  });

  test("Check Automatically detectable accessibility issues for the young tariffs page", async ({
    youngTariffPageSteps,
    accessibilitySteps,
    accessibilityReportContext,
  }) => {
    await youngTariffPageSteps.openYoungTariffsPage();
    await youngTariffPageSteps.checkTariffCarouselIsDisplayed();
    let accessibilityScanResults =
      await accessibilitySteps.getAccessibilityScanResultForCurrentPage();
    await accessibilitySteps.checkAccessibilityIssues(accessibilityScanResults);
    accessibilityReportContext.results = accessibilityScanResults;
  });

  test("Check Automatically detectable accessibility issues for the data tariffs page", async ({
    dataTariffPageSteps,
    accessibilitySteps,
    accessibilityReportContext,
  }) => {
    await dataTariffPageSteps.openDataTariffsPage();
    await dataTariffPageSteps.checkTariffCarouselIsDisplayed();
    let accessibilityScanResults =
      await accessibilitySteps.getAccessibilityScanResultForCurrentPage();
    await accessibilitySteps.checkAccessibilityIssues(accessibilityScanResults);
    accessibilityReportContext.results = accessibilityScanResults;
  });

  test("Check Automatically detectable accessibility issues for the smartphone devices page", async ({
    smartphoneDevicesPageSteps,
    accessibilitySteps,
    accessibilityReportContext,
  }) => {
    await smartphoneDevicesPageSteps.openSmartphoneDevicesPage();
    await smartphoneDevicesPageSteps.checkProductsAreDisplayed();
    let accessibilityScanResults =
      await accessibilitySteps.getAccessibilityScanResultForCurrentPage();
    await accessibilitySteps.checkAccessibilityIssues(accessibilityScanResults);
    accessibilityReportContext.results = accessibilityScanResults;
  });

  test("Check Automatically detectable accessibility issues for the tablet devices page", async ({
    tabletDevicesPageSteps,
    accessibilitySteps,
    accessibilityReportContext,
  }) => {
    await tabletDevicesPageSteps.openTabletDevicesPage();
    await tabletDevicesPageSteps.checkProductsAreDisplayed();
    let accessibilityScanResults =
      await accessibilitySteps.getAccessibilityScanResultForCurrentPage();
    await accessibilitySteps.checkAccessibilityIssues(accessibilityScanResults);
    accessibilityReportContext.results = accessibilityScanResults;
  });

  test("Check Automatically detectable accessibility issues for the smartwatch devices page", async ({
    smartwatchDevicesPageSteps,
    accessibilitySteps,
    accessibilityReportContext,
  }) => {
    await smartwatchDevicesPageSteps.openSmartwatchDevicesPage();
    await smartwatchDevicesPageSteps.checkProductsAreDisplayed();
    let accessibilityScanResults =
      await accessibilitySteps.getAccessibilityScanResultForCurrentPage();
    await accessibilitySteps.checkAccessibilityIssues(accessibilityScanResults);
    accessibilityReportContext.results = accessibilityScanResults;
  });
});
