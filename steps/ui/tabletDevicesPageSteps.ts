import { step } from "../../util/testDecorators";
import { DevicesBasePageSteps } from "./devicesBasePageSteps";
import { TabletDevicesPage } from "../../pages/tabletDevicesPage";

export class TabletDevicesPageSteps extends DevicesBasePageSteps {
  private readonly tabletDevicesPage: TabletDevicesPage;

  constructor(tabletDevicesPage: TabletDevicesPage) {
    super(tabletDevicesPage);
    this.tabletDevicesPage = tabletDevicesPage;
  }

  @step("Open tablet devices page")
  async openTabletDevicesPage() {
    await this.openDevicesPage(this.tabletDevicesPage.tabletDevicesUrlPath);
  }
}
