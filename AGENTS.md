# Project guide for AI agents and new contributors

UI test automation framework: **Playwright + TypeScript + Allure**, targeting a German telecom
e-commerce portal (shop / tariffs / devices / cart checkout). It also integrates the Google Gemini
API for AI analysis of accessibility findings and the Jira REST API for defect creation.

---

## 1. Architecture

The framework has four layers. Understanding the boundary between them is the single most important
thing before making a change.

```
tests/*.test.ts          ← WHAT is verified. Orchestration only.
      │  consumes fixtures
fixtures/testFixtures.ts ← Dependency injection. Wires Page → Steps → fixture name.
      │  constructs
steps/**/*.ts            ← HOW it is done. Actions + assertions. Allure steps live here.
      │  holds a reference to
pages/*.ts               ← WHERE things are. Locators and URL paths ONLY. No logic.
```

### Layer rules

| Layer | Allowed | Not allowed |
|---|---|---|
| `pages/` | `Locator` fields, URL path fields, trivial URL builders | `expect`, `click`, `goto`, waits |
| `steps/` | Playwright actions, `expect`, waits, `@step` | Raw CSS selectors (they belong in the page object) |
| `tests/` | Calls to step methods, Allure metadata, `test.skip` | `page.locator`, `expect`, direct Playwright API use |

`tests/e2e.test.ts` is the reference for how a spec should read: a flat, readable sequence of
`await someSteps.doSomething()` with no Playwright primitives in sight.

### Directory map

| Path | Purpose |
|---|---|
| `tests/` | Specs (`*.test.ts`). `testDir` in the Playwright config. |
| `tests/setup/` | Auth setup projects: `setup.uat.ts`, `setup.prod.ts`. |
| `pages/` | Page objects. |
| `steps/ui/` | UI step classes, one per page + `BasePageSteps` + `AccessibilitySteps`. |
| `steps/api/` | API step classes: `BaseApiSteps`, `GeminiApiSteps`, `JiraApiSteps`. |
| `steps/ReportingSteps.ts` | Allure attachments, AI analysis, Jira ticket creation. |
| `fixtures/testFixtures.ts` | Custom `test` object, fixture wiring, shared type re-exports. |
| `config/` | `config.loader.ts` (dotenv), `env.config.ts` (typed env access), `auth.config.ts` (storage-state paths). |
| `util/` | `step.decorator.ts`, `timeouts.constants.ts`, `test-data.util.ts`, `jira-adf.utils.ts`. |
| `test-data/testData.ts` | Static test data holder (currently an empty placeholder class). |
| `resources/` | `uat.env`, `prod.env`, and `snapshots/` (per `snapshotPathTemplate`). |
| `.auth/` | Generated browser storage state. Git-ignored. |
| `allure-results/`, `test-results/` | Generated output. Git-ignored. Never edit or commit. |

---

## 2. Inheritance chains

Both pages and steps mirror the same hierarchy. When adding functionality, put it at the lowest
level that is broad enough — a locator shared by all tariff pages goes on `TariffsBasePage`, not on
each of the three children.

**Pages**

```
HomePage
├── ShopPage
│   ├── TariffsBasePage → SmartphoneTariffsPage, PrepaidTariffsPage, DataTariffsPage
│   └── DevicesBasePage → SmartphoneDevicesPage
└── CartPage
```

**Steps** (`BasePageSteps` is abstract and owns `page` + `waitForPageToLoad()`)

```
BasePageSteps
└── HomePageSteps
    ├── ShopPageSteps
    │   ├── TariffsBasePageSteps → SmartphoneTariffsPageSteps, PrepaidTariffPageSteps, DataTariffPageSteps
    │   └── DevicesBasePageSteps → SmartphoneDevicesPageSteps
    └── CartPageSteps
```

**API steps**: `BaseApiSteps` → `GeminiApiSteps`, `JiraApiSteps`. `BaseApiSteps` provides
`get`/`post` wrappers that auto-attach a request/response JSON log to the Allure report, plus
`checkSchema`, `waitForSuccessfulResponse`, and `checkRequestIsSuccessful`.

---

## 3. Recipe: adding a new page

This requires edits in **three** files. Skipping the fixture registration is the most common mistake
— the steps class will exist but be unreachable from tests.

1. **`pages/NewThingPage.ts`** — extend the closest existing page. Declare `readonly` `Locator`
   fields, assign them in the constructor.

   ```ts
   export class NewThingPage extends ShopPage {
     readonly newThingUrlPath: string;
     readonly submitButton: Locator;

     constructor(page: Page) {
       super(page);
       this.newThingUrlPath = "new-thing";
       this.submitButton = page.locator("button[data-qa='SubmitBtn']");
     }
   }
   ```

2. **`steps/ui/NewThingPageSteps.ts`** — extend the matching steps class, take the page object via a
   `protected` constructor parameter, decorate every public method with `@step`.

   ```ts
   export class NewThingPageSteps extends ShopPageSteps {
     constructor(protected newThingPage: NewThingPage) {
       super(newThingPage);
     }

     @step("Open new thing page")
     async openNewThingPage() { ... }
   }
   ```

3. **`fixtures/testFixtures.ts`** — add the fixture to the generic type parameter *and* the
   implementation object:

   ```ts
   newThingPageSteps: NewThingPageSteps;
   // ...
   newThingPageSteps: async ({ page }, use) => {
     await use(new NewThingPageSteps(new NewThingPage(page)));
   }
   ```

Tests then destructure `{ newThingPageSteps }` from the test callback argument.

---

## 4. Conventions

- **Import `test`, `expect`, and types from `fixtures/testFixtures`, not from `@playwright/test`.**
  The fixture module re-exports `Page`, `APIRequestContext`, `APIResponse`, `TestInfo`, and
  `AccessibilityReportContext`. Importing `test` from `@playwright/test` bypasses all fixtures.
  (`Locator` is the exception — page objects import it directly from `@playwright/test`.)
- **`@step("...")`** from `util/step.decorator.ts` wraps a method in `test.step` so it appears in
  Allure. Without an explicit name it falls back to `ClassName.methodName`.
- **Assertion messages are mandatory.** Every `expect` passes a human-readable second argument:
  `await expect(locator, "Cookies modal is visible").toBeVisible();` — this text is what shows up in
  the report.
- **Never use raw millisecond numbers.** Use `TIMEOUTS.SECONDS_10` etc. from
  `util/timeouts.constants.ts`. Add a new constant there rather than inlining a number.
- **Selector preference:** `data-qa` / `data-cy` attributes first, then stable IDs. Selectors live
  only in `pages/`.
- **Naming:** page objects `XxxPage`, step classes `XxxPageSteps`, fixtures `xxxPageSteps`
  (camelCase). Step methods that assert start with `check...`; navigation starts with `open...`.
- **Soft assertions** (`expect.soft`) are used where a test should collect all failures rather than
  stop at the first — see `AccessibilitySteps.checkAccessibilityIssues` and
  `BaseApiSteps.checkSchema`.
- **Formatting:** Prettier is a dependency (default config, no rc file). Match the existing style:
  double quotes, semicolons, trailing commas, 2-space indent.
- **Note the one inconsistency:** `pages/devicesBasePage.ts` is lower-camelCase while every other
  page file is PascalCase. Follow PascalCase for new files.

---

## 5. Configuration and environments

`playwright.config.ts` calls `loadEnvironmentConfig()` before anything else. That function:

1. Defaults `process.env.ENV` to `"prod"` if unset.
2. Loads the root `.env` (secrets, tokens — git-ignored).
3. Loads `resources/<env>.env` with `override: true`, so environment files win over `.env`.
4. **Throws** if `resources/<env>.env` does not exist.

Read every variable through `config/env.config.ts` (`EnvConfig`), never `process.env` directly.
`EnvConfig.getEnvVariable` throws a descriptive error on a missing variable, which is the intended
fail-fast behaviour.

Available accessors: `currentEnv`, `isUatEnvironment`, `isProdEnvironment`, `isJiraReportingEnabled`
(reads `ENABLE_JIRA_TICKETING === "true"`), `getProxyUrl`, `getJiraUsername`, `getJiraApiKey`,
`getJiraProjectBaseUrl`, `getGeminiApiKey`, `getEnvHttpAuthUsername`, `getEnvHttpAuthPassword`,
`getPortalCustomerUsername`, `getPortalCustomerPassword`.

**Never commit secrets.** `/.env*` and `/.auth/` are git-ignored; keep it that way.

### Authentication flow

The config defines a `Tests setup` project matched by `` new RegExp(`/setup.*\\.${EnvConfig.currentEnv}\\.ts`) ``,
which the `Google Chrome` project depends on. So `tests/setup/setup.<env>.ts` runs first, logs in,
and writes browser storage state to the path in `config/auth.config.ts`
(`AUTH_USER_SESSION_STATE_PATH.CUSTOMER_USER` = `.auth/customer.json`). Specs then opt in with:

```ts
test.use({ storageState: AUTH_USER_SESSION_STATE_PATH.CUSTOMER_USER });
```

Consequence: adding a new environment requires both a `resources/<env>.env` file **and** a
`tests/setup/setup.<env>.ts` file, or the setup project matches nothing.

### Other config facts

- Test timeout: 2 minutes. `fullyParallel: true`.
- `headless: false` — runs headed by default, including locally.
- CI: `retries: 2`, `workers: 4`, `forbidOnly: true`.
- Snapshots resolve to `resources/snapshots/{testFileName}{ext}` with `maxDiffPixelRatio: 0.03`.
- Only the `Google Chrome` channel project is active; Firefox/WebKit/mobile projects are commented out.

---

## 6. Running tests

```sh
npm install                 # dependencies
npx playwright install      # browsers, first run only

npm test                    # or: npx playwright test  (defaults to ENV=prod)
npm run test:uat            # cross-env ENV=uat
npm run test:prod           # cross-env ENV=prod

npx playwright test --grep @e2e            # by tag
npx playwright test tests/e2e.test.ts      # single spec
```

There is no lint or build script and no `tsconfig.json` in the repo — type checking happens through
Playwright's own transpilation at run time. Do not add a linter or type-check step unless the task
explicitly calls for it.

### Tags

Applied at the `describe` level via `{ tag: "@e2e" }`. Currently in use: `@e2e` (checkout flow),
`@axe` (accessibility). Reuse an existing tag where it fits rather than inventing a new one.

---

## 7. Reporting

Reporters: `line` + `allure-playwright` → `allure-results/`, with `environmentInfo` carrying the
active environment.

```sh
npx allure generate ./allure-results
npx allure open allure-report/awesome
```

Specs add Allure metadata in `beforeAll`: `allure.epic/feature/story` (`e2e.test.ts`) or
`allure.parentSuite/suite` (`accessibility.test.ts`).

`ReportingSteps` (injected as the `reportingSteps` fixture) provides:

- `attachAccessibilityScanResults` — attaches the full axe JSON plus a violations-only summary.
- `attachAiAnalyzedAccessibilityReport` — sends violations to Gemini and attaches an HTML
  remediation report. Truncated to 5 rules × 3 nodes × 500 chars of HTML to control prompt size and
  cost; adjust those constants rather than sending raw axe output.
- `createJiraTicketForFailedTest` — gated on `EnvConfig.isJiraReportingEnabled`. **Currently defined
  but never invoked from any spec or hook.** The README describes an `@jira` tag driving this; that
  tag does not exist in the codebase yet. Treat it as an incomplete feature, not as working
  behaviour.

Accessibility scanning uses `AxeBuilder` with tags `wcag2a`, `wcag2aa`, `wcag2aaa`, `wcag21a`,
`wcag21aa`, `wcag22aa`, `best-practice`.

---

## 8. Guidance for agents

- Respect the layer boundaries in §1 — the most common failure mode is putting a selector or an
  `expect` in the wrong file. Adding logic to a spec instead of a steps class is a regression even
  if the test passes.
- Adding a page means touching three files (§3). Verify the fixture registration.
- Prefer extending an existing base class over duplicating a method across siblings.
- Do not edit `allure-results/`, `test-results/`, `.auth/`, `node_modules/`, or `package-lock.json`.
- Do not commit `.env` files, credentials, tokens, or real customer data. Generate data with
  `TestDataUtil` / Faker instead.
- Tests hit a live external site, so full-suite runs are slow and network-dependent. Validate with
  the narrowest `--grep` or single-file selector that covers the change.
- If a task's requirement conflicts with these conventions, say so rather than silently working
  around the architecture.
