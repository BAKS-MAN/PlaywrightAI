import { Page } from "../../fixtures/testFixtures";
import { TIMEOUTS } from "../../util/timeouts.constants";

export abstract class BasePageSteps {
  protected constructor(public readonly page: Page) {}

  protected async waitForPageToLoad(): Promise<void> {
    await this.page.waitForLoadState("load", { timeout: TIMEOUTS.SECONDS_30 });
  }
}
