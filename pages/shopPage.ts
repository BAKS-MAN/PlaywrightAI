import { HomePage } from "./homePage";
import { Page } from "../fixtures/testFixtures";

export class ShopPage extends HomePage {
  readonly shopUrlPath: string;

  constructor(page: Page) {
    super(page);
    this.shopUrlPath = "/shop";
  }

  getShopPageUrl() {
    return `${this.baseUrlPath}${this.shopUrlPath}`;
  }
}
