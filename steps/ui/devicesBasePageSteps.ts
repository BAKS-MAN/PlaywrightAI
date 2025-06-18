import { step } from "../../util/testDecorators";
import { expect } from "../../fixtures/testFixtures";
import { ShopPageSteps } from "./shopPageSteps";
import { DevicesBasePage } from "../../pages/devicesBasePage";

export class DevicesBasePageSteps extends ShopPageSteps {
  private readonly devicesBasePage: DevicesBasePage;

  constructor(devicesBasePage: DevicesBasePage) {
    super(devicesBasePage);
    this.devicesBasePage = devicesBasePage;
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
      timeout: 10000,
    });
  }
}
