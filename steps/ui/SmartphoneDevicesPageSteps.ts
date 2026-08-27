import { step } from "../../util/step.decorator";
import { DevicesBasePageSteps } from "./DevicesBasePageSteps";
import { SmartphoneDevicesPage } from "../../pages/SmartphoneDevicesPage";

export class SmartphoneDevicesPageSteps extends DevicesBasePageSteps {
  constructor(protected smartphonesPage: SmartphoneDevicesPage) {
    super(smartphonesPage);
  }

  @step("Open smartphone devices page")
  async openSmartphoneDevicesPage() {
    await this.openDevicesPage(this.smartphonesPage.smartphoneDevicesUrlPath);
  }
}
