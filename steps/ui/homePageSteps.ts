import { HomePage } from "../../pages/homePage";
import { step } from "../../util/testDecorators";
import { expect } from "../../fixtures/testFixtures";
import { BasePageSteps } from "./basePageSteps";
import { ConfigurationData } from "../../config/configurationData";

export class HomePageSteps extends BasePageSteps {
  private readonly homePage: HomePage;

  constructor(homePage: HomePage) {
    super(homePage.page);
    this.homePage = homePage;
  }

  @step("open home page")
  async openHomePage() {
    await this.homePage.page.goto(this.homePage.baseUrlPath);
  }

  @step("accept cookies")
  async acceptCookies() {
    await expect(
      this.homePage.cookiesModal,
      "Cookies modal is visible",
    ).toBeVisible({
      timeout: 10000,
    });
    await this.homePage.cookiesAcceptButton.click();
    await expect(
      this.homePage.cookiesModal,
      "Cookies modal is closed",
    ).not.toBeVisible();
  }

  @step("Save session state into the file")
  async saveUserSessionState() {
    await this.homePage.page
      .context()
      .storageState({ path: ".auth/session.json" });
  }

  @step("Login as customer")
  async loginAsCustomerUser() {
    await this.homePage.userLoginButton.click();
    await expect(
      this.homePage.usernameInput,
      "Username input field is displayed",
    ).toBeVisible();
    await this.homePage.usernameInput.fill(
      ConfigurationData.getPortalCustomerUsername(),
    );
    await this.homePage.loginNextButton.click();
    await expect(
      this.homePage.passwordInput,
      "Password input field is displayed",
    ).toBeVisible();
    await this.homePage.passwordInput.fill(
      ConfigurationData.getPortalCustomerPassword(),
    );
    await this.homePage.validatePasswordButton.click();
    await expect(
      this.homePage.authenticatedUserIcon,
      "Authenticated user icon is displayed",
    ).toBeVisible({
      timeout: 20000,
    });
  }

  protected async waitForPageToLoad(): Promise<void> {
    const timeout = 10000;
    await this.page.waitForFunction(
      () => {
        return document.readyState === "complete";
      },
      { timeout },
    );
  }
}
