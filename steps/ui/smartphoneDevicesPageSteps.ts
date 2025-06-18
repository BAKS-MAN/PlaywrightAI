import { step } from "../../util/testDecorators";
import { DevicesBasePageSteps } from "./devicesBasePageSteps";
import { SmartphoneDevicesPage } from "../../pages/smartphoneDevicesPage";

export class SmartphoneDevicesPageSteps extends DevicesBasePageSteps {
  private readonly smartphonesPage: SmartphoneDevicesPage;

  constructor(smartphonesPage: SmartphoneDevicesPage) {
    super(smartphonesPage);
    this.smartphonesPage = smartphonesPage;
  }

  @step("Open smartphone devices page")
  async openSmartphoneDevicesPage() {
    await this.openDevicesPage(this.smartphonesPage.smartphoneDevicesUrlPath);
  }
}
