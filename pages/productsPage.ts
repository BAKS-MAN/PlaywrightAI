import { Locator, Page } from "@playwright/test";
import { HomePage } from "./homePage";

export class ProductsPage extends HomePage {
  readonly page: Page;
  readonly productsUrlPath: string;
  readonly productCardSelector: string;
  readonly productCard: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.productsUrlPath = "/products-and-solutions/next-level-networking";
    this.productCardSelector = "#product-links-card-0";
    this.productCard = page.locator(this.productCardSelector);
  }
}
