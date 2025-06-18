import { step } from "../../util/testDecorators";
import { SmartphoneTariffsPage } from "../../pages/smartphoneTariffsPage";
import { TariffsBasePageSteps } from "./tariffsBasePageSteps";
import { expect } from "../../fixtures/testFixtures";

export class SmartphoneTariffsPageSteps extends TariffsBasePageSteps {
  private readonly smartphoneTariffsPage: SmartphoneTariffsPage;

  constructor(smartphoneTariffsPage: SmartphoneTariffsPage) {
    super(smartphoneTariffsPage);
    this.smartphoneTariffsPage = smartphoneTariffsPage;
  }

  @step("Open smartphone tariffs page")
  async openSmartphoneTariffsPage() {
    await this.openTariffsPage(
      this.smartphoneTariffsPage.smartphoneTariffsUrlPath,
    );
  }

  @step("Select 50 Gb tariff card")
  async selectFiftyGbTariffCard() {
    await this.smartphoneTariffsPage.tariffCardFiftyGb.click();
  }

  @step("Click checkout without device button")
  async clickCheckoutWithoutDeviceButton() {
    await this.smartphoneTariffsPage.checkoutWithoutDeviceButton.click();
  }

  @step("Proceed to checkout with one card")
  async proceedWithOneCard() {
    await expect(
      this.smartphoneTariffsPage.plusKarteModal,
      "Wait for 'plusKarte' modal to be displayed",
    ).toBeVisible();
    await this.smartphoneTariffsPage.proceedWithOneCardButton.click();
  }
}
