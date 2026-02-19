import * as playwrightTest from "@playwright/test";
import { AxeResults } from "axe-core";
import { HomePageSteps } from "../steps/ui/homePageSteps";
import { HomePage } from "../pages/homePage";
import { SmartphoneTariffsPageSteps } from "../steps/ui/smartphoneTariffsPageSteps";
import { SmartphoneTariffsPage } from "../pages/smartphoneTariffsPage";
import { AccessibilitySteps } from "../steps/ui/accessibilitySteps";
import { GeminiApiSteps } from "../steps/api/geminiApiSteps";
import { JiraApiSteps } from "../steps/api/jiraApiSteps";
import { ReportingSteps } from "../steps/reportingSteps";
import { ConfigurationData } from "../config/configurationData";
import { ShopPage } from "../pages/shopPage";
import { ShopPageSteps } from "../steps/ui/shopPageSteps";
import { YoungTariffPageSteps } from "../steps/ui/youngTariffPageSteps";
import { DataTariffPageSteps } from "../steps/ui/dataTariffPageSteps";
import { PrepaidTariffPageSteps } from "../steps/ui/prePaidTariffPageSteps";
import { PrepaidTariffsPage } from "../pages/prepaidTariffsPage";
import { YoungTariffsPage } from "../pages/youngTariffsPage";
import { DataTariffsPage } from "../pages/dataTariffsPage";
import { SmartphoneDevicesPageSteps } from "../steps/ui/smartphoneDevicesPageSteps";
import { TabletDevicesPageSteps } from "../steps/ui/tabletDevicesPageSteps";
import { SmartwatchDevicesPageSteps } from "../steps/ui/smartwatchDevicesPageSteps";
import { SmartphoneDevicesPage } from "../pages/smartphoneDevicesPage";
import { TabletDevicesPage } from "../pages/tabletDevicesPage";
import { SmartwatchDevicesPage } from "../pages/smartwatchDevicesPage";
import { CartPageSteps } from "../steps/ui/cartPageSteps";
import { CartPage } from "../pages/cartPage";

export const test = playwrightTest.test.extend<{
  geminiApiContext: APIRequestContext;
  jiraApiContext: APIRequestContext;
  accessibilityReportContext: AccessibilityReportContext;
  reportingSteps: ReportingSteps;
  geminiApiSteps: GeminiApiSteps;
  jiraApiSteps: JiraApiSteps;
  accessibilitySteps: AccessibilitySteps;
  homePageSteps: HomePageSteps;
  shopPageSteps: ShopPageSteps;
  smartphoneTariffsPageSteps: SmartphoneTariffsPageSteps;
  prepaidTariffPageSteps: PrepaidTariffPageSteps;
  youngTariffPageSteps: YoungTariffPageSteps;
  dataTariffPageSteps: DataTariffPageSteps;
  smartphoneDevicesPageSteps: SmartphoneDevicesPageSteps;
  tabletDevicesPageSteps: TabletDevicesPageSteps;
  smartwatchDevicesPageSteps: SmartwatchDevicesPageSteps;
  cartPageSteps: CartPageSteps;
}>({
  geminiApiContext: async ({}, use) => {
    const context = await playwrightTest.request.newContext({
      baseURL: "https://generativelanguage.googleapis.com/v1beta/",
      proxy: { server: ConfigurationData.getProxyUrl() },
    });
    await use(context);
  },
  jiraApiContext: async ({}, use) => {
    const context = await playwrightTest.request.newContext({
      baseURL: `${ConfigurationData.getJiraProjectBaseUrl()}/rest/api/3/`,
      userAgent: "PostmanRuntime/7.44.0",
      httpCredentials: {
        username: ConfigurationData.getJiraUsername(),
        password: ConfigurationData.getJiraApiKey(),
        send: "always",
      },
      proxy: { server: ConfigurationData.getProxyUrl() },
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
    await use(new AccessibilitySteps(page));
  },
  homePageSteps: async ({ page }, use) => {
    await use(new HomePageSteps(new HomePage(page)));
  },
  shopPageSteps: async ({ page }, use) => {
    await use(new ShopPageSteps(new ShopPage(page)));
  },
  smartphoneTariffsPageSteps: async ({ page }, use) => {
    await use(new SmartphoneTariffsPageSteps(new SmartphoneTariffsPage(page)));
  },
  prepaidTariffPageSteps: async ({ page }, use) => {
    await use(new PrepaidTariffPageSteps(new PrepaidTariffsPage(page)));
  },
  youngTariffPageSteps: async ({ page }, use) => {
    await use(new YoungTariffPageSteps(new YoungTariffsPage(page)));
  },
  dataTariffPageSteps: async ({ page }, use) => {
    await use(new DataTariffPageSteps(new DataTariffsPage(page)));
  },
  smartphoneDevicesPageSteps: async ({ page }, use) => {
    await use(new SmartphoneDevicesPageSteps(new SmartphoneDevicesPage(page)));
  },
  tabletDevicesPageSteps: async ({ page }, use) => {
    await use(new TabletDevicesPageSteps(new TabletDevicesPage(page)));
  },
  smartwatchDevicesPageSteps: async ({ page }, use) => {
    await use(new SmartwatchDevicesPageSteps(new SmartwatchDevicesPage(page)));
  },
  cartPageSteps: async ({ page }, use) => {
    await use(new CartPageSteps(new CartPage(page)));
  },
});

export const expect = playwrightTest.expect;
export type Page = playwrightTest.Page;
export type APIRequestContext = playwrightTest.APIRequestContext;
export type APIResponse = playwrightTest.APIResponse;
export type TestInfo = playwrightTest.TestInfo;
export type AccessibilityReportContext = {
  results: AxeResults | null;
};
