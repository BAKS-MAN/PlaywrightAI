# UI test automation framework

UI test automation framework based on Playwright + TypeScript + Allure Reporting

### [Playwright official documentation](https://playwright.dev) | [PlaywrightAPI reference](https://playwright.dev/docs/api/class-playwright)

Playwright is a framework for Web Testing and Automation. It allows
testing [Chromium](https://www.chromium.org/Home), [Firefox](https://www.mozilla.org/en-US/firefox/new/)
and [WebKit](https://webkit.org/) with a single API.

- Pre-Configured: Page object pattern;
- Pre-Configured: Step desgin pattern;
- @Step decorator;
- Reporting via Allure report tool;
- Configured Playwright APIRequestContext for LLM promting via Google Gemini API;
- Configured Playwright APIRequestContext for Jira issue creation via Jira API;
  <br>Ticket creation process is performed for a failed test annotated with the tag @jira

## Installation

### Prerequisites

The following software are required:

- nodejs : Download and Install Node.js from
  ```sh
  https://nodejs.org/en/download/
  ```

1. Clone the repo

2. Navigate to folder and install npm packages using:
```sh
npm install
```

3. For first time installation run below command to download required browsers
```sh
npx playwright install
```

## Environments Configuration

Environment-specific data, like BASE_URL, HTTP Auth credentials e.t.c, are expected to be stored in:

```text
resources/prod.env
```

Environment data, like API Tokens, are expected to be stored in:

```text
root .env
```

## Test execution

For test execution the following command should be used:
```sh
npx playwright test
```

To run your tests against different environments:

```sh
npm run test:uat
npm run test:prod
```