import { step } from "../../util/testDecorators";
import { TariffsBasePageSteps } from "./tariffsBasePageSteps";
import { YoungTariffsPage } from "../../pages/youngTariffsPage";

export class YoungTariffPageSteps extends TariffsBasePageSteps {
  private readonly youngTariffsPage: YoungTariffsPage;

  constructor(youngTariffsPage: YoungTariffsPage) {
    super(youngTariffsPage);
    this.youngTariffsPage = youngTariffsPage;
  }

  @step("Open young tariffs page")
  async openYoungTariffsPage() {
    await this.openTariffsPage(this.youngTariffsPage.youngTariffsUrlPath);
  }
}
