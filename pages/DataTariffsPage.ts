import { TariffsBasePage } from "./TariffsBasePage";
import { Page } from "../fixtures/testFixtures";

export class DataTariffsPage extends TariffsBasePage {
  readonly dataTariffsUrlPath: string;

  constructor(page: Page) {
    super(page);
    this.dataTariffsUrlPath = "daten-tarife";
  }
}
