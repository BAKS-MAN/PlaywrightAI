import { step } from "../../util/testDecorators";
import { TariffsBasePageSteps } from "./tariffsBasePageSteps";
import { DataTariffsPage } from "../../pages/dataTariffsPage";

export class DataTariffPageSteps extends TariffsBasePageSteps {
  private readonly dataTariffsPage: DataTariffsPage;

  constructor(dataTariffsPage: DataTariffsPage) {
    super(dataTariffsPage);
    this.dataTariffsPage = dataTariffsPage;
  }

  @step("Open data tariffs page")
  async openDataTariffsPage() {
    await this.openTariffsPage(this.dataTariffsPage.dataTariffsUrlPath);
  }
}
