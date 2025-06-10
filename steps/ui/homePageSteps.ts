import { HomePage } from "../../pages/homePage";
import { step } from "../../util/testDecorators";
import { TestData } from "../../test-data/testData";
import { expect } from "../../fixtures/testFixtures";
import { BasePageSteps } from "./basePageSteps";

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
      .storageState({ path: TestData.USER_SESSION_STATE_PATH });
  }
}
