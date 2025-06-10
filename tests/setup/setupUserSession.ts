import { test as setup } from "../../fixtures/testFixtures";

setup("Accept cookies for session", async ({ homePageSteps }) => {
  await homePageSteps.openHomePage();
  await homePageSteps.acceptCookies();
  await homePageSteps.saveUserSessionState();
});
