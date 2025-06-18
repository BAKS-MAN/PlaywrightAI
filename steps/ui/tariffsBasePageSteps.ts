import { step } from "../../util/testDecorators";
import { expect } from "../../fixtures/testFixtures";
import { TariffsBasePage } from "../../pages/tariffsBasePage";
import { ShopPageSteps } from "./shopPageSteps";

export class TariffsBasePageSteps extends ShopPageSteps {
  private readonly tariffsBasePage: TariffsBasePage;

  constructor(tariffsBasePage: TariffsBasePage) {
    super(tariffsBasePage);
    this.tariffsBasePage = tariffsBasePage;
  }

  async openTariffsPage(childPagePath: string) {
    await this.tariffsBasePage.page.goto(
      `${this.tariffsBasePage.getShopPageUrl()}/tarife/${childPagePath}`,
    );
    await this.waitForPageToLoad();
  }

  @step("Check tariff's carousel is displayed")
  async checkTariffCarouselIsDisplayed() {
    await expect(
      this.tariffsBasePage.tariffCarousel,
      "Tariff's carousel is displayed",
    ).toBeVisible({
      timeout: 10000,
    });
  }
}
