import { step } from "../../util/step.decorator";
import { expect } from "../../fixtures/testFixtures";
import { TariffsBasePage } from "../../pages/TariffsBasePage";
import { ShopPageSteps } from "./ShopPageSteps";
import { TIMEOUTS } from "../../util/timeouts.constants";

export class TariffsBasePageSteps extends ShopPageSteps {
  constructor(protected tariffsBasePage: TariffsBasePage) {
    super(tariffsBasePage);
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
      timeout: TIMEOUTS.SECONDS_10,
    });
  }
}
