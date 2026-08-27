import { step } from "../../util/step.decorator";
import { TariffsBasePageSteps } from "./TariffsBasePageSteps";
import { DataTariffsPage } from "../../pages/DataTariffsPage";

export class DataTariffPageSteps extends TariffsBasePageSteps {
  constructor(protected dataTariffsPage: DataTariffsPage) {
    super(dataTariffsPage);
  }

  @step("Open data tariffs page")
  async openDataTariffsPage() {
    await this.openTariffsPage(this.dataTariffsPage.dataTariffsUrlPath);
  }
}
