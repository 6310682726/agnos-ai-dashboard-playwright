# Agnos AI Dashboard Playwright tests

This project provides TypeScript/Playwright coverage for the Agnos healthcare AI dashboard: authentication, navigation, patient-record search and filters, and record downloads.

## Prerequisites

- Node.js 20 or newer
- npm
- Access to the Agnos development environment
- A test dashboard account

Install dependencies and browsers:

```bash
npm install
npx playwright install
```

## Credentials and environment

Copy `.env.example` to `.env` and set the account values. `.env` is ignored by Git.

```ini
AGNOS_USERNAME=your-test-email
AGNOS_PASSWORD=your-test-password
```

Optional values include `AGNOS_DASHBOARD_URL`, `AGNOS_SIGNUP_URL`, `AGNOS_PATIENT_URL`, `TEST_PATIENT_SEARCH`, `TEST_TRIAGE_LEVEL`, and `TEST_CHANNEL`.

## Running tests

```bash
npm test                         # headless suite
npm run test:headed              # headed browser
npx playwright test tests/auth.spec.ts
npm run report                   # open the latest HTML report
npm run typecheck                # TypeScript validation
```

Failure screenshots, videos, and traces are written to `test-results/`; the HTML report is written to `playwright-report/`.

## Structure

```text
pages/                 Page Object Model classes
tests/                 Playwright test specifications and fixtures
playwright.config.ts   Browser, URL, timeout, and artifact configuration
TEST_PLAN.md           Manual and automation test-case matrix
TEST_REPORT_TEMPLATE.md Execution-report template
```

Selectors intentionally prefer accessible labels, roles, and text. If the deployed application exposes stable `data-testid` attributes, those should be preferred for any selector that is ambiguous in the target environment.

## Assumptions

The development UI may change labels or route names. The page objects therefore use accessible-role/text alternatives for common labels. The test data used for search and filter values is configurable through environment variables rather than embedded in the test suite.
