import { step } from "../../util/testDecorators";
import { DevicesBasePageSteps } from "./devicesBasePageSteps";
import { SmartwatchDevicesPage } from "../../pages/smartwatchDevicesPage";

export class SmartwatchDevicesPageSteps extends DevicesBasePageSteps {
  private readonly smartwatchDevicesPage: SmartwatchDevicesPage;

  constructor(smartwatchDevicesPage: SmartwatchDevicesPage) {
    super(smartwatchDevicesPage);
    this.smartwatchDevicesPage = smartwatchDevicesPage;
  }

  @step("Open smartwatch devices page")
  async openSmartwatchDevicesPage() {
    await this.openDevicesPage(
      this.smartwatchDevicesPage.smartwatchDevicesUrlPath,
    );
  }
}
