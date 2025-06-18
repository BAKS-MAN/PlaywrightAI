import { TariffsBasePage } from "./tariffsBasePage";
import { Page } from "../fixtures/testFixtures";
import { Locator } from "@playwright/test";

export class SmartphoneTariffsPage extends TariffsBasePage {
  readonly smartphoneTariffsUrlPath: string;
  readonly tariffCardFiftyGb: Locator;
  readonly checkoutWithoutDeviceButton: Locator;
  readonly plusKarteModal: Locator;
  readonly proceedWithOneCardButton: Locator;

  constructor(page: Page) {
    super(page);
    this.smartphoneTariffsUrlPath = "smartphone-tarife";
    this.tariffCardFiftyGb = page.locator("//span[.='50']/..");
    this.checkoutWithoutDeviceButton = page.locator(
      "span button[data-qa='TRF_SelectPlan']",
    );
    this.plusKarteModal = page.locator("div[class*='StylePlusCardDiv']");
    this.proceedWithOneCardButton = page.locator(
      "button[class*='plusCardBtn']",
    );
  }
}
