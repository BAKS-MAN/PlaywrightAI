import * as allure from "allure-js-commons";
import { test } from "../fixtures/testFixtures";
import { TestData } from "../test-data/testData";

test.use({ storageState: TestData.USER_SESSION_STATE_PATH });

test.describe("E2E tests for user checkout flow", { tag: "@e2e" }, () => {
  test.beforeAll(async () => {
    await allure.epic("Order creation");
    await allure.feature("Checkout from the shop page");
    await allure.story("Checkout tests");
  });

  test("User is able to checkout with 50 Gb smartphone tariff without device selection", async ({
    smartphoneTariffsPageSteps,
    cartPageSteps,
  }) => {
    await smartphoneTariffsPageSteps.openSmartphoneTariffsPage();
    await smartphoneTariffsPageSteps.selectFiftyGbTariffCard();
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
    await cartPageSteps.fillIbanNumber("DE05593501101370793364");
    await cartPageSteps.clickIbanCheckbox();
    await cartPageSteps.clickContinueButton();
    await cartPageSteps.checkPaymentMethodStepIsCompleted();
    await cartPageSteps.acceptMandatoryAgreements();
    await cartPageSteps.clickPlaceOrderButton();
    await cartPageSteps.checkOrderConfirmationPageIsDisplayed();
  });
});
