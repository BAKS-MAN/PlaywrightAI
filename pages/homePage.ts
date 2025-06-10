import { Locator, Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly baseUrlPath: string;
  readonly cookiesModal: Locator;
  readonly cookiesAcceptButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.baseUrlPath = "./global";
    this.cookiesModal = page.locator("div#__tealiumGDPRecModal");
    this.cookiesAcceptButton = page.locator("button#consentAcceptAll");
  }
}
