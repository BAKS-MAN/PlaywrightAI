import { Page } from "../fixtures/testFixtures";
import { DevicesBasePage } from "./devicesBasePage";

export class SmartwatchDevicesPage extends DevicesBasePage {
  readonly smartwatchDevicesUrlPath: string;

  constructor(page: Page) {
    super(page);
    this.smartwatchDevicesUrlPath = "smartwatches";
  }
}
