import { Page } from "../../fixtures/testFixtures";

export abstract class BasePageSteps {
  constructor(public readonly page: Page) {}
}
