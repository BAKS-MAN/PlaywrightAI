import { ShopPage } from "./shopPage";
import { Page } from "../fixtures/testFixtures";
import { Locator } from "@playwright/test";

export class TariffsBasePage extends ShopPage {
  readonly tariffCarousel: Locator;

  constructor(page: Page) {
    super(page);
    this.tariffCarousel = page.locator("div#js-tileSectionRef");
  }
}
