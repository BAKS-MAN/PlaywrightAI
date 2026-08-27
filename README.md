# 🚀 Playwright TypeScript E2E & AI-Driven Testing Framework

A modern, enterprise-grade UI & API Test Automation Framework built with **Playwright**, **TypeScript**, and **Allure
Reporting**, designed for high-scale e-commerce and web platforms (targeting German telecom portal workflows).

Engineered with strict layer separation, **AI-Assisted Accessibility Remediation** via Google Gemini API, **Automated
Defect Lifecycle Integration** via Jira REST API, and native **AI-Agent Context Protocols (`AGENTS.md`)**.

---

## 🌟 Key Highlights & Engineering Features

- **Architecture**: Strict 4-layer separation (**Pages** $\rightarrow$ **Steps** $\rightarrow$
  **Fixtures** $\rightarrow$ **Tests**) enforcing zero Playwright primitives inside specs.
- **🤖 AI-Ready & Agent-Native**: Includes `AGENTS.md` providing architectural context, inheritance rules, and code
  generation boundaries for LLM coding agents (Cursor, Claude Code, Gemini).
- **🧠 AI-Driven Accessibility Analysis**: Automated accessibility scans using `@axe-core/playwright` with zero-latency
  HTML remediation advice generated dynamically via **Google Gemini 3.7 Flash API**.
- **🎫 Jira REST API Integration**: Custom Atlassian Document Format (ADF) builder generating structured bug reports with
  stack traces and AI diagnostics upon test failure (feature-flagged).
- **🛠️ Custom Decorator Pattern**: Method-level `@step("...")` decorators providing granular step tracing in Allure
  reports without boilerplate code.
- **🔐 Multi-Environment Authentication**: Custom session storage setup (`setup.prod.ts`, `setup.uat.ts`) bypassing login
  UI overhead across target environments.

---

## 📐 Architecture & Layer Boundaries

```
tests/*.test.ts          ← WHAT is verified. Business orchestration only.
      │  consumes fixtures
fixtures/testFixtures.ts ← Dependency injection. Page → Steps → Test context.
      │  constructs
steps/**/*.ts            ← HOW it is executed. Page actions, assertions, @step decorators.
      │  holds reference to
pages/*.ts               ← WHERE elements live. Pure Locators & URL paths ONLY.
```

| Layer    | Responsibility                                          | Prohibited Practices                              |
|----------|---------------------------------------------------------|---------------------------------------------------|
| `pages/` | `Locator` definitions, relative URL paths, URL builders | `expect`, `click()`, `goto()`, explicit waits     |
| `steps/` | Playwright actions, UI/API assertions, `@step` wrappers | Raw CSS/XPath selectors (must use Page Objects)   |
| `tests/` | Step method invocation, Allure metadata, execution flow | `page.locator`, `expect`, direct Playwright calls |

---

## 🤖 AI-Agent Integration (`AGENTS.md`)

This repository is optimized for autonomous AI coding agents (Cursor, Copilot, Claude Code).

The root [`AGENTS.md`](./AGENTS.md) acts as a strict context contract defining:

1. **Layer Rules & Recipe Patterns**: Step-by-step guides for extending pages, steps, and fixtures without architectural
   drift.
2. **Naming Conventions**: Strict `PascalCase` vs `dot.notation` rules (`*.config.ts`, `*.test.ts`, `XxxPage.ts`).
3. **Environment Security**: Guidelines prohibiting hardcoded credentials and enforced `EnvConfig` accessors.

---

## 🛠️ Tech Stack & Dependencies

- **Engine**: [Playwright](https://playwright.dev/) (`@playwright/test`)
- **Language**: TypeScript (Strict Mode)
- **Reporting**: Allure Report (`allure-playwright`)
- **AI Service**: `@google/genai` (Google Gemini 3.7 Flash)
- **Accessibility**: `@axe-core/playwright`
- **Design Patterns**: Page Object Model (POM), Step Object Pattern, Decorator Pattern, Dependency Injection (Fixtures)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18+`
- **npm**: `v9+`

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install required Playwright browser binaries:
   ```bash
   npx playwright install chrome
   ```

---

## ⚙️ Environment Configuration

Environment configuration is managed via tiered `.env` files and typed accessors (`EnvConfig`):

- **Global Secrets / API Keys**: Root `.env` (git-ignored)
- **Environment Overrides**: `resources/prod.env` / `resources/uat.env`

### Required Variables

Create a `.env` file in the root directory:

```env
ENV=prod
GEMINI_API_KEY=your_gemini_api_key
ENABLE_JIRA_TICKETING=false
JIRA_PROJECT_BASE_URL=https://your-domain.atlassian.net
JIRA_USERNAME=your_jira_email
JIRA_API_KEY=your_jira_api_token
```

> **Note**: Access environment variables strictly via `EnvConfig` (e.g., `EnvConfig.getGeminiApiKey()`).

---

## 🧪 Running Tests

### Execute All Tests (Default: `ENV=prod`)

```bash
npx playwright test
```

### Run Against Specific Environments

```bash
npm run test:uat
npm run test:prod
```

### Run by Tag or Spec

```bash
# Run End-to-End Checkout Suite
npx playwright test --grep @e2e

# Run Accessibility Suite
npx playwright test --grep @axe

# Run specific test file
npx playwright test tests/e2e.test.ts
```

---

## 📊 Allure Reporting & AI Attachments

To generate and serve the interactive Allure report:

```bash
npx allure generate ./allure-results --clean
npx allure open
```

### Report Features

- **Visual Step Hierarchy**: Auto-formatted step names via `@step` decorators.
- **AI Accessibility Findings**: Contains rendered HTML attachments with Gemini AI remediation guidance for WCAG
  violations.
- **REST API Trace Logs**: `BaseApiSteps` automatically attaches raw Request/Response JSON payloads for HTTP calls.

---

## 📁 Repository Structure

```text
.
├── config/                  # Environment & auth configurations (env.config.ts, auth.config.ts)
├── fixtures/                # Custom Playwright test fixtures & dependency injection
├── models/                  # TypeScript interfaces & DTOs (jira.dto.ts)
├── pages/                   # Pure Page Objects (Locators & paths only)
├── resources/               # Environment files (.env) & snapshot baselines
├── steps/                   # Business step implementations
│   ├── api/                 # API client steps (BaseApiSteps, GeminiApiSteps, JiraApiSteps)
│   ├── ui/                  # UI step classes (HomePageSteps, TariffsSteps, etc.)
│   └── ReportingSteps.ts    # Allure attachment & AI report orchestration
├── tests/                   # Test specs (*.test.ts)
│   └── setup/               # Pre-test authentication setup specs
├── util/                    # Helper decorators, ADF builders, timeout constants
├── AGENTS.md                # System prompt & architectural guide for AI agents
├── playwright.config.ts     # Playwright test runner configuration
└── README.md                # Framework documentation
```
