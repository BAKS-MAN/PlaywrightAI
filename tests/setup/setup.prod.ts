import { test as setup } from "../../fixtures/testFixtures";

setup("Prepare user session state", async ({ homePageSteps }) => {
  await homePageSteps.openHomePage();
  await homePageSteps.acceptCookies();
  await homePageSteps.saveUserSessionState();
});
