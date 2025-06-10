import { step } from "../../util/testDecorators";
import { ProductsPage } from "../../pages/productsPage";
import { expect } from "../../fixtures/testFixtures";
import { HomePageSteps } from "./homePageSteps";

export class ProductsPageSteps extends HomePageSteps {
  private readonly productsPage: ProductsPage;

  constructor(productsPage: ProductsPage) {
    super(productsPage);
    this.productsPage = productsPage;
  }

  @step("Open products page")
  async openProductsPage() {
    await this.productsPage.page.goto(
      this.productsPage.baseUrlPath.concat(this.productsPage.productsUrlPath),
    );
  }

  @step("Check product card is displayed")
  async checkProductCardIsDisplayed() {
    await expect(
      this.productsPage.productCard,
      "Expect product card to be visible",
    ).toBeVisible({
      timeout: 10000,
    });
  }
}
