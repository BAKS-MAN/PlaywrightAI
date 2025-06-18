import { TariffsBasePage } from "./tariffsBasePage";
import { Page } from "../fixtures/testFixtures";

export class PrepaidTariffsPage extends TariffsBasePage {
  readonly prepaidTariffsUrlPath: string;

  constructor(page: Page) {
    super(page);
    this.prepaidTariffsUrlPath = "magenta-mobil-prepaid";
  }
}
