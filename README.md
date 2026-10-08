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

Optional values include `AGNOS_DASHBOARD_URL`, `AGNOS_SIGNUP_URL`, `AGNOS_PATIENT_URL`, `TEST_PATIENT_SEARCH`, `TEST_TRIAGE_LEVEL`, `TEST_DATE_PRESET`, and `TEST_CHANNEL`.

Create a synthetic diagnosis through `AGNOS_PATIENT_URL` before running record-search or export checks. Put only its non-identifying record ID in `TEST_PATIENT_SEARCH`. Use the exact visible dashboard values for triage and channel, and one of the date presets shown by the dashboard (for example, `Today`). Do not use real patient details or production data.

## Running tests

```bash
npm test                         # headless suite
npm run test:headed              # headed browser
npx playwright test tests/auth.spec.ts
npm run report                   # open the latest HTML report
npm run typecheck                # TypeScript validation
```

Failure screenshots, videos, and traces are written to `test-results/`; the HTML report is written to `playwright-report/`.

The test runner uses one worker to avoid sending several simultaneous login requests to the shared development environment. Tests that require an existing record are skipped when their test data is missing; account registration and diagnosis creation are intentionally manual because they create persistent records.

## Structure

```text
pages/                 Page Object Model classes
tests/                 Playwright test specifications and fixtures
playwright.config.ts   Browser, URL, timeout, and artifact configuration
TEST_PLAN.md           Manual and automation test-case matrix
TEST_CASES.tsv         Detailed spreadsheet-ready test cases (tab-separated)
TEST_EXECUTION_REPORT.csv Latest automated and manual execution results
MANUAL_TEST_REPORT.md   Manual test steps, results, and screenshot evidence
manual-evidence/        Screenshots captured for manual test findings
```

Selectors intentionally prefer accessible labels, roles, and text. If the deployed application exposes stable `data-testid` attributes, those should be preferred for any selector that is ambiguous in the target environment.

## Test data and report limitations

The development UI may change labels or route names. The page objects use accessible roles and visible text where available; some dashboard filters currently expose no semantic checkbox/tab roles, so their selected state is checked through the visible UI.

The CSV report is the source of truth for execution results and can be imported into Google Sheets (`File` → `Import` → `Upload`). Manual steps and screenshot evidence are in `MANUAL_TEST_REPORT.md`; keep manual results separate from automated results.
