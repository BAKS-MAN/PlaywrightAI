import { step } from "../../util/step.decorator";
import { TariffsBasePageSteps } from "./TariffsBasePageSteps";
import { PrepaidTariffsPage } from "../../pages/PrepaidTariffsPage";

export class PrepaidTariffPageSteps extends TariffsBasePageSteps {
  constructor(protected prepaidTariffsPage: PrepaidTariffsPage) {
    super(prepaidTariffsPage);
  }

  @step("Open prepaid tariffs page")
  async openPrepaidTariffsPage() {
    await this.openTariffsPage(this.prepaidTariffsPage.prepaidTariffsUrlPath);
  }
}
