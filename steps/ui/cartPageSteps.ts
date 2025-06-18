import { step } from "../../util/testDecorators";
import { HomePageSteps } from "./homePageSteps";
import { CartPage } from "../../pages/cartPage";
import { expect } from "../../fixtures/testFixtures";

export class CartPageSteps extends HomePageSteps {
  private readonly cartPage: CartPage;

  constructor(cartPage: CartPage) {
    super(cartPage);
    this.cartPage = cartPage;
  }

  @step("Click proceed to checkout button")
  async clickProceedToCheckoutButton() {
    await this.cartPage.proceedToCheckoutButton.click();
  }

  @step("Check cart contains ordered item")
  async checkCartContainsOrderedItem() {
    await expect(
      this.cartPage.orderedItem,
      "Ordered item is displayed in the cart",
    ).toBeVisible({ timeout: 30000 });
  }

  @step("Click continue button")
  async clickContinueButton() {
    await this.cartPage.continueButton.click();
  }

  @step("Check that 'Telekom Login' step is marked as completed")
  async checkLoginStepIsCompleted() {
    await expect(
      this.cartPage.completedLoginStep,
      " 'Telekom Login' step is completed",
    ).toBeVisible({ timeout: 10000 });
  }

  @step("Check that 'Persönliche Daten' step is marked as completed")
  async checkPersonalDataStepIsCompleted() {
    await expect(
      this.cartPage.completedPersonalDataStep,
      "'Persönliche Daten' step is completed",
    ).toBeVisible({ timeout: 10000 });
  }

  @step("Select 'Post-Ident' option for identification")
  async selectPostIdentificationOption() {
    await this.cartPage.postIdentificationOption.click();
  }

  @step("Check that 'Verifizierung' step is marked as completed")
  async checkIdentificationStepIsCompleted() {
    await expect(
      this.cartPage.completedIdentificationStep,
      "'Verifizierung' step is completed",
    ).toBeVisible({ timeout: 10000 });
  }

  @step("Check that 'Zahlungsmethode' step is marked as completed")
  async checkPaymentMethodStepIsCompleted() {
    await expect(
      this.cartPage.completedPaymentMethodStep,
      "'Zahlungsmethode' step is completed",
    ).toBeVisible({ timeout: 10000 });
  }

  @step("Check that 'Zustimmungen' step is marked as completed")
  async checkAgreementsStepIsCompleted() {
    await expect(
      this.cartPage.completedPaymentMethodStep,
      "'Zustimmungen' step is completed",
    ).toBeVisible({ timeout: 10000 });
  }

  @step("Fill IBAN number")
  async fillIbanNumber(ibanNumber: string) {
    await this.cartPage.ibanInput.fill(ibanNumber);
  }

  @step("Click IBAN checkbox")
  async clickIbanCheckbox() {
    await this.cartPage.ibanCheckbox.click();
  }

  @step("Accept mandatory agreements")
  async acceptMandatoryAgreements() {
    await this.cartPage.checkboxAgb.click();
    await this.cartPage.checkboxWiderrufsrecht.click();
  }

  @step("Click place order button")
  async clickPlaceOrderButton() {
    await this.cartPage.placeOrderButton.click();
  }

  @step("Check order confirmation page is displayed")
  async checkOrderConfirmationPageIsDisplayed() {
    await expect(
      this.cartPage.page,
      "Order confirmation page is displayed",
    ).toHaveURL(/order-confirmation?/, { timeout: 15000 });
  }
}
