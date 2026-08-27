import { Page } from "../fixtures/testFixtures";
import { Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly baseUrlPath: string;
  readonly cookiesModal: Locator;
  readonly cookiesAcceptButton: Locator;
  readonly userLoginButton: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginNextButton: Locator;
  readonly validatePasswordButton: Locator;
  readonly authenticatedUserIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.baseUrlPath = "./shop";
    this.cookiesModal = page.locator("div#__tealiumGDPRecModal");
    this.cookiesAcceptButton = page.locator("button#consentAcceptAll");
    this.userLoginButton = page.locator("div[data-qa='HDR_UserIcon']");
    this.usernameInput = page.locator("#username");
    this.loginNextButton = page.locator("button[data-qa='ATN_Nextbutton']");
    this.passwordInput = page.locator("input#password");
    this.validatePasswordButton = page.locator(
      "button[data-cy='validate-password']",
    );
    this.authenticatedUserIcon = page.locator("#user-icon");
  }
}
