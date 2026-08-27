import { step } from "../../util/step.decorator";
import { expect } from "../../fixtures/testFixtures";
import { ShopPageSteps } from "./ShopPageSteps";
import { DevicesBasePage } from "../../pages/devicesBasePage";
import { TIMEOUTS } from "../../util/timeouts.constants";

export class DevicesBasePageSteps extends ShopPageSteps {
  constructor(protected devicesBasePage: DevicesBasePage) {
    super(devicesBasePage);
  }

  async openDevicesPage(childPagePath: string) {
    await this.devicesBasePage.page.goto(
      `${this.devicesBasePage.getShopPageUrl()}/geraete/${childPagePath}`,
    );
    await this.waitForPageToLoad();
  }

  @step("Check products are displayed")
  async checkProductsAreDisplayed() {
    await expect(
      this.devicesBasePage.productsGrid,
      "Products are displayed",
    ).toBeVisible({
      timeout: TIMEOUTS.SECONDS_10,
    });
  }
}
