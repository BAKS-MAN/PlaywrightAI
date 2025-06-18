import { Page } from "../fixtures/testFixtures";
import { DevicesBasePage } from "./devicesBasePage";

export class TabletDevicesPage extends DevicesBasePage {
  readonly tabletDevicesUrlPath: string;

  constructor(page: Page) {
    super(page);
    this.tabletDevicesUrlPath = "tablets";
  }
}
