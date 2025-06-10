import {
  APIRequestContext,
  APIResponse,
  expect,
} from "../../fixtures/testFixtures";
import { step } from "../../util/testDecorators";

export class BaseApiSteps {
  constructor(protected apiContext: APIRequestContext) {}

  @step("Check API request is successful")
  async checkRequestIsSuccessful(apiResponse: APIResponse) {
    await expect(
      apiResponse,
      `API request failed with status code: ${apiResponse.status()}
      \n error response text: ${await apiResponse.text()}`,
    ).toBeOK();
  }
}
