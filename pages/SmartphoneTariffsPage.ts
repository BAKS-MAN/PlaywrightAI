import { TariffsBasePage } from "./TariffsBasePage";
import { Page } from "../fixtures/testFixtures";
import { Locator } from "@playwright/test";

export class SmartphoneTariffsPage extends TariffsBasePage {
  readonly smartphoneTariffsUrlPath: string;
  readonly tariffCard100Gb: Locator;
  readonly checkoutWithoutDeviceButton: Locator;
  readonly plusKarteModal: Locator;
  readonly proceedWithOneCardButton: Locator;

  constructor(page: Page) {
    super(page);
    this.smartphoneTariffsUrlPath = "smartphone-tarife";
    this.tariffCard100Gb = page.locator("//span[.='100']/..");
    this.checkoutWithoutDeviceButton = page.locator(
      "span button[data-qa='TRF_SelectPlan']",
    );
    this.plusKarteModal = page.locator("div[class*='StylePlusCardDiv']");
    this.proceedWithOneCardButton = page.locator(
      "button[class*='plusCardBtn']",
    );
  }
}
