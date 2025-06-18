import { step } from "../../util/testDecorators";
import { HomePageSteps } from "./homePageSteps";
import { ShopPage } from "../../pages/shopPage";

export class ShopPageSteps extends HomePageSteps {
  private readonly shopPage: ShopPage;

  constructor(shopPage: ShopPage) {
    super(shopPage);
    this.shopPage = shopPage;
  }

  @step("Open shop page")
  async openShopPage() {
    await this.shopPage.page.goto(this.shopPage.getShopPageUrl());
    await this.waitForPageToLoad();
  }
}
