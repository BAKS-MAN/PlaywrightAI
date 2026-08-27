import { HomePage } from "../../pages/HomePage";
import { step } from "../../util/step.decorator";
import { expect } from "../../fixtures/testFixtures";
import { BasePageSteps } from "./BasePageSteps";
import { EnvConfig } from "../../config/env.config";
import { AUTH_USER_SESSION_STATE_PATH } from "../../config/auth.config";
import { TIMEOUTS } from "../../util/timeouts.constants";

export class HomePageSteps extends BasePageSteps {
  constructor(protected homePage: HomePage) {
    super(homePage.page);
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
      timeout: TIMEOUTS.SECONDS_10
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
      .storageState({ path: AUTH_USER_SESSION_STATE_PATH.CUSTOMER_USER });
  }

  @step("Login as customer")
  async loginAsCustomerUser() {
    await this.homePage.userLoginButton.click();
    await expect(
      this.homePage.usernameInput,
      "Username input field is displayed",
    ).toBeVisible();
    await this.homePage.usernameInput.fill(
      EnvConfig.getPortalCustomerUsername(),
    );
    await this.homePage.loginNextButton.click();
    await expect(
      this.homePage.passwordInput,
      "Password input field is displayed",
    ).toBeVisible();
    await this.homePage.passwordInput.fill(
      EnvConfig.getPortalCustomerPassword(),
    );
    await this.homePage.validatePasswordButton.click();
    await expect(
      this.homePage.authenticatedUserIcon,
      "Authenticated user icon is displayed",
    ).toBeVisible({
      timeout: TIMEOUTS.SECONDS_20,
    });
  }
}
