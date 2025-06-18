import { TariffsBasePage } from "./tariffsBasePage";
import { Page } from "../fixtures/testFixtures";

export class YoungTariffsPage extends TariffsBasePage {
  readonly youngTariffsUrlPath: string;

  constructor(page: Page) {
    super(page);
    this.youngTariffsUrlPath = "smartphone-tarife-young";
  }
}
