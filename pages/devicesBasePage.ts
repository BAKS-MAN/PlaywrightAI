import { ShopPage } from "./shopPage";
import { Page } from "../fixtures/testFixtures";
import { Locator } from "@playwright/test";

export class DevicesBasePage extends ShopPage {
  readonly productsGrid: Locator;

  constructor(page: Page) {
    super(page);
    this.productsGrid = page.locator("div[class*='StyledProductsGrid']");
  }
}
