import * as allure from "allure-js-commons";
import { test } from "../fixtures/testFixtures";
import { AUTH_USER_SESSION_STATE_PATH } from "../config/auth.config";
import { TestDataUtil } from "../util/test-data.util";
import { EnvConfig } from "../config/env.config";

test.use({ storageState: AUTH_USER_SESSION_STATE_PATH.CUSTOMER_USER });

test.describe("E2E tests for user checkout flow", { tag: "@e2e" }, () => {
  test.skip(
    EnvConfig.isProdEnvironment,
    "Test suite only for test environment",
  );

  test.beforeAll(async () => {
    await allure.epic("Order creation");
    await allure.feature("Checkout from the shop page");
    await allure.story("Checkout tests");
  });

  test("User is able to checkout with 100 Gb smartphone tariff without device selection", async ({
    smartphoneTariffsPageSteps,
    cartPageSteps,
  }) => {
    await smartphoneTariffsPageSteps.openSmartphoneTariffsPage();
    await smartphoneTariffsPageSteps.select100GbTariffCard();
    await smartphoneTariffsPageSteps.clickCheckoutWithoutDeviceButton();
    await smartphoneTariffsPageSteps.proceedWithOneCard();
    await cartPageSteps.checkCartContainsOrderedItem();
    await cartPageSteps.clickProceedToCheckoutButton();
    await cartPageSteps.checkLoginStepIsCompleted();
    await cartPageSteps.clickContinueButton();
    await cartPageSteps.checkPersonalDataStepIsCompleted();
    await cartPageSteps.selectPostIdentificationOption();
    await cartPageSteps.clickContinueButton();
    await cartPageSteps.checkIdentificationStepIsCompleted();
    await cartPageSteps.clickContinueButton();
    await cartPageSteps.fillIbanNumber(TestDataUtil.generateGermanIban());
    await cartPageSteps.clickIbanCheckbox();
    await cartPageSteps.clickContinueButton();
    await cartPageSteps.checkPaymentMethodStepIsCompleted();
    await cartPageSteps.acceptMandatoryAgreements();
    await cartPageSteps.clickPlaceOrderButton();
    await cartPageSteps.checkOrderConfirmationPageIsDisplayed();
  });
});
