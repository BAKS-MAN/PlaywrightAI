import { step } from "../../util/step.decorator";
import { HomePageSteps } from "./HomePageSteps";
import { ShopPage } from "../../pages/ShopPage";

export class ShopPageSteps extends HomePageSteps {
  constructor(protected shopPage: ShopPage) {
    super(shopPage);
  }

  @step("Open shop page")
  async openShopPage() {
    await this.shopPage.page.goto(this.shopPage.getShopPageUrl());
    await this.waitForPageToLoad();
  }
}
