import {
  APIRequestContext,
  APIResponse,
  expect,
  test,
} from "../../fixtures/testFixtures";
import { step } from "../../util/step.decorator";
import { TIMEOUTS } from "../../util/timeouts.constants";

export class BaseApiSteps {
  constructor(protected apiContext: APIRequestContext) {}

  private async parseResponseBody(response: APIResponse): Promise<any> {
    const responseText = await response.text();
    try {
      return responseText ? JSON.parse(responseText) : null;
    } catch {
      return responseText;
    }
  }

  private async attachApiLog(
    method: string,
    url: string,
    options: any,
    response: APIResponse,
    parsedBody: any,
  ) {
    const requestData = {
      method: method.toUpperCase(),
      url: url,
      headers: options?.headers || {},
      body: options?.data || options?.form || null,
    };

    const responseData = {
      status: response.status(),
      statusText: response.statusText(),
      body: parsedBody,
    };

    const logContent = JSON.stringify(
      { Request: requestData, Response: responseData },
      null,
      2,
    );

    await test.info().attach(`[${requestData.method}] ${url}`, {
      body: logContent,
      contentType: "application/json",
    });
  }

  protected async get<T = any>(
    url: string,
    options?: Parameters<APIRequestContext["get"]>[1],
  ) {
    const response = await this.apiContext.get(url, {
      timeout: TIMEOUTS.SECONDS_20,
      ...options,
    });
    const body = await this.parseResponseBody(response);
    await this.attachApiLog("GET", url, options, response, body);
    return { response, body: body as T };
  }

  protected async post<T = any>(
    url: string,
    options?: Parameters<APIRequestContext["post"]>[1],
  ) {
    const response = await this.apiContext.post(url, {
      timeout: TIMEOUTS.SECONDS_10,
      ...options,
    });
    const body = await this.parseResponseBody(response);
    await this.attachApiLog("POST", url, options, response, body);
    return { response, body: body as T };
  }

  checkResponseIsObject(response: any) {
    expect(response, "Response is an object").toBeInstanceOf(Object);
  }

  checkResponseIsArray(response: any) {
    expect(Array.isArray(response), "Response is an array").toBeTruthy();
  }

  checkResponseIsNotEmptyArray(responseArray: any) {
    this.checkResponseIsArray(responseArray);
    expect(responseArray.length, "Array is not empty").toBeGreaterThan(0);
  }

  @step("Verify object matches API specification")
  protected checkSchema(
    receivedObj: any,
    validationSchema: Record<string, any>,
    contextInfo = "Object",
  ) {
    for (const [key, expectedMatcher] of Object.entries(validationSchema)) {
      const hasKey = key in receivedObj;
      expect
        .soft(hasKey, `Missing required field '${key}' in ${contextInfo}`)
        .toBeTruthy();

      if (hasKey) {
        expect
          .soft(
            receivedObj[key],
            `Field '${key}' in ${contextInfo} has incorrect type`,
          )
          .toEqual(expectedMatcher);
      }
    }
  }

  @step("Wait for successful response from API")
  protected async waitForSuccessfulResponse<T>(
    action: () => Promise<T>,
    options?: { timeout?: number; intervals?: number[] },
  ): Promise<T> {
    let result: T;
    await expect(async () => {
      result = await action();
    }, "Response is successful after waiting with retry calls").toPass({
      timeout: options?.timeout ?? TIMEOUTS.SECONDS_30,
      intervals: options?.intervals ?? [TIMEOUTS.SECONDS_5],
    });

    return result!;
  }

  @step("Check API request is successful")
  async checkRequestIsSuccessful(apiResponse: APIResponse) {
    await expect(
      apiResponse,
      `API request failed with status code: ${apiResponse.status()}
      \n error response text: ${await apiResponse.text()}`,
    ).toBeOK();
  }
}
