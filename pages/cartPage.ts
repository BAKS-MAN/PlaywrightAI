import { HomePage } from "./homePage";
import { Page } from "../fixtures/testFixtures";
import { Locator } from "@playwright/test";

export class CartPage extends HomePage {
  readonly orderedItem: Locator;
  readonly proceedToCheckoutButton: Locator;
  readonly completedStep: Locator;
  readonly completedLoginStep: Locator;
  readonly completedPersonalDataStep: Locator;
  readonly completedIdentificationStep: Locator;
  readonly completedPaymentMethodStep: Locator;
  readonly completedAgreementStep: Locator;
  readonly postIdentificationOption: Locator;
  readonly ibanInput: Locator;
  readonly ibanCheckbox: Locator;
  readonly checkboxAgb: Locator;
  readonly checkboxWiderrufsrecht: Locator;
  readonly continueButton: Locator;
  readonly placeOrderButton: Locator;

  constructor(page: Page) {
    super(page);

    this.orderedItem = page.locator("article[class*='StyledCardContent']");
    this.proceedToCheckoutButton = page.locator(
      "button[data-qa='BKT_ProceedToCheckout']",
    );
    this.completedStep = page.locator("li[class*='completed-next_active']");
    this.completedLoginStep = this.completedStep.locator(
      "h2[id*='checkout_step_Telekom Login']",
    );
    this.completedPersonalDataStep = this.completedStep.locator(
      "h2[id='checkout_step_Persönliche Daten']",
    );
    this.completedIdentificationStep = this.completedStep.locator(
      "h2[id='checkout_step_Verifizierung']",
    );
    this.completedPaymentMethodStep = this.completedStep.locator(
      "h2[id='checkout_step_Zahlungsmethode']",
    );
    this.completedAgreementStep = this.completedStep.locator(
      "h2[id='checkout_step_Zustimmungen']",
    );
    this.postIdentificationOption = page.locator("#offlineIdentification");
    this.ibanInput = page.locator("input#iban");
    this.ibanCheckbox = page.locator("div[class*='iban-checkbox'] input");
    this.checkboxAgb = page.getByRole("checkbox", {
      name: "consents_mandatory_0",
    });
    this.checkboxWiderrufsrecht = page.getByRole("checkbox", {
      name: "consents_mandatory_1",
    });
    this.continueButton = page.locator("button[type='submit']");
    this.placeOrderButton = page.locator("button[class*='placeOrderBtn']");
  }
}
