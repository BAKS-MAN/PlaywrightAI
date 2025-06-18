import { step } from "../../util/testDecorators";
import { TariffsBasePageSteps } from "./tariffsBasePageSteps";
import { PrepaidTariffsPage } from "../../pages/prepaidTariffsPage";

export class PrepaidTariffPageSteps extends TariffsBasePageSteps {
  private readonly prepaidTariffsPage: PrepaidTariffsPage;

  constructor(prepaidTariffsPage: PrepaidTariffsPage) {
    super(prepaidTariffsPage);
    this.prepaidTariffsPage = prepaidTariffsPage;
  }

  @step("Open prepaid tariffs page")
  async openPrepaidTariffsPage() {
    await this.openTariffsPage(this.prepaidTariffsPage.prepaidTariffsUrlPath);
  }
}
