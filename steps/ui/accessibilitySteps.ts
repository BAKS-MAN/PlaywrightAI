import { expect, Page } from "../../fixtures/testFixtures";
import { step } from "../../util/testDecorators";
import { AxeResults } from "axe-core";
import AxeBuilder from "@axe-core/playwright";
import { ProductsPage } from "../../pages/productsPage";

export class AccessibilitySteps {
  private readonly productsPage: ProductsPage;

  constructor(productsPage: ProductsPage) {
    this.productsPage = productsPage;
  }

  @step("Get accessibility scan result for product page")
  async getAccessibilityScanResultForProductsPage() {
    return await this.getAccessibilityScanResultForPage(this.productsPage.page);
  }

  @step("Get accessibility scan result for product card")
  async getAccessibilityScanResultForProductCardComponent() {
    return await this.getAccessibilityScanResultForElement(
      this.productsPage.page,
      this.productsPage.productCardSelector,
    );
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

  private getConfiguredAxeBuilder(page: Page): AxeBuilder {
    return new AxeBuilder({ page })
      .withTags([
        "wcag2a",
        "wcag2aa",
        "wcag2aaa",
        "wcag21a",
        "wcag21aa",
        "wcag22aa",
        "best-practice",
      ])
      .disableRules(["avoid-inline-spacing"]);
  }

  @step("Get accessibility scan result for the current page")
  private async getAccessibilityScanResultForPage(page: Page) {
    return await this.getConfiguredAxeBuilder(page).analyze();
  }

  @step("Get accessibility scan result for element")
  private async getAccessibilityScanResultForElement(
    page: Page,
    selector: string,
  ) {
    return await this.getConfiguredAxeBuilder(page).include(selector).analyze();
  }
}
