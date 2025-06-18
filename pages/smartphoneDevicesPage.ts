import { Page } from "../fixtures/testFixtures";
import { DevicesBasePage } from "./devicesBasePage";

export class SmartphoneDevicesPage extends DevicesBasePage {
  readonly smartphoneDevicesUrlPath: string;

  constructor(page: Page) {
    super(page);
    this.smartphoneDevicesUrlPath = "smartphones";
  }
}
