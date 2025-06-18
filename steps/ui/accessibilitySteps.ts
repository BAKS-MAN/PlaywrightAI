import { expect, Page } from "../../fixtures/testFixtures";
import { step } from "../../util/testDecorators";
import { AxeResults } from "axe-core";
import AxeBuilder from "@axe-core/playwright";

export class AccessibilitySteps {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  @step("Get accessibility scan result for the current page")
  async getAccessibilityScanResultForCurrentPage() {
    return await this.getConfiguredAxeBuilder().analyze();
  }

  @step("Check there are no automatically detectable accessibility issues")
  async checkAccessibilityIssues(accessibilityScanResults: AxeResults) {
    expect
      .soft(
        accessibilityScanResults.violations.length,
        "WCAG 2.x A, AA or AAA violations were detected",
      )
      .toBeFalsy();
  }

  private getConfiguredAxeBuilder(): AxeBuilder {
    return new AxeBuilder({ page: this.page }).withTags([
      "wcag2a",
      "wcag2aa",
      "wcag2aaa",
      "wcag21a",
      "wcag21aa",
      "wcag22aa",
      "best-practice",
    ]);
  }

  @step("Get accessibility scan result for element")
  private async getAccessibilityScanResultForElement(selector: string) {
    return await this.getConfiguredAxeBuilder().include(selector).analyze();
  }

  // @step("Get accessibility scan result for product card")
  // async getAccessibilityScanResultForProductCardComponent() {
  //   return await this.getAccessibilityScanResultForElement(
  //     this.productsPage.page,
  //     this.productsPage.tariffCarousel,
  //   );
  // }
}
