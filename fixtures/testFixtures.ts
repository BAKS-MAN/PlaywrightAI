import * as playwrightTest from "@playwright/test";
import { AxeResults } from "axe-core";
import { HomePageSteps } from "../steps/ui/HomePageSteps";
import { HomePage } from "../pages/HomePage";
import { SmartphoneTariffsPageSteps } from "../steps/ui/SmartphoneTariffsPageSteps";
import { SmartphoneTariffsPage } from "../pages/SmartphoneTariffsPage";
import { AccessibilitySteps } from "../steps/ui/AccessibilitySteps";
import { GeminiApiSteps } from "../steps/api/GeminiApiSteps";
import { JiraApiSteps } from "../steps/api/JiraApiSteps";
import { ReportingSteps } from "../steps/ReportingSteps";
import { EnvConfig } from "../config/env.config";
import { ShopPage } from "../pages/ShopPage";
import { ShopPageSteps } from "../steps/ui/ShopPageSteps";
import { DataTariffPageSteps } from "../steps/ui/DataTariffPageSteps";
import { PrepaidTariffPageSteps } from "../steps/ui/PrepaidTariffPageSteps";
import { PrepaidTariffsPage } from "../pages/PrepaidTariffsPage";
import { DataTariffsPage } from "../pages/DataTariffsPage";
import { SmartphoneDevicesPageSteps } from "../steps/ui/SmartphoneDevicesPageSteps";
import { SmartphoneDevicesPage } from "../pages/SmartphoneDevicesPage";
import { CartPageSteps } from "../steps/ui/CartPageSteps";
import { CartPage } from "../pages/CartPage";

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
  dataTariffPageSteps: DataTariffPageSteps;
  smartphoneDevicesPageSteps: SmartphoneDevicesPageSteps;
  cartPageSteps: CartPageSteps;
}>({
  geminiApiContext: async ({}, use) => {
    const context = await playwrightTest.request.newContext({
      baseURL: "https://generativelanguage.googleapis.com/v1beta/",
      proxy: { server: EnvConfig.getProxyUrl() },
    });
    await use(context);
  },
  jiraApiContext: async ({}, use) => {
    const context = await playwrightTest.request.newContext({
      baseURL: `${EnvConfig.getJiraProjectBaseUrl()}/rest/api/3/`,
      userAgent: "PostmanRuntime/7.44.0",
      httpCredentials: {
        username: EnvConfig.getJiraUsername(),
        password: EnvConfig.getJiraApiKey(),
        send: "always",
      },
      proxy: { server: EnvConfig.getProxyUrl() },
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
  dataTariffPageSteps: async ({ page }, use) => {
    await use(new DataTariffPageSteps(new DataTariffsPage(page)));
  },
  smartphoneDevicesPageSteps: async ({ page }, use) => {
    await use(new SmartphoneDevicesPageSteps(new SmartphoneDevicesPage(page)));
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
