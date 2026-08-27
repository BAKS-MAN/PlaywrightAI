import { step } from "../../util/step.decorator";
import { SmartphoneTariffsPage } from "../../pages/SmartphoneTariffsPage";
import { TariffsBasePageSteps } from "./TariffsBasePageSteps";
import { expect } from "../../fixtures/testFixtures";

export class SmartphoneTariffsPageSteps extends TariffsBasePageSteps {
  constructor(protected smartphoneTariffsPage: SmartphoneTariffsPage) {
    super(smartphoneTariffsPage);
  }

  @step("Open smartphone tariffs page")
  async openSmartphoneTariffsPage() {
    await this.openTariffsPage(
      this.smartphoneTariffsPage.smartphoneTariffsUrlPath,
    );
  }

  @step("Select 100 Gb tariff card")
  async select100GbTariffCard() {
    await this.smartphoneTariffsPage.tariffCard100Gb.click();
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
