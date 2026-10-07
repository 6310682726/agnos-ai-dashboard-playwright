# Agnos AI Dashboard test execution summary

**Run date:** 2026-10-07
**Environment:** Agnos development dashboard
**Browser:** Chromium

## Results

- Automated: 13 total — 10 passed, 1 failed, 2 skipped.
- Planned manual checks completed: 2 — SIGNUP-001 passed and SIGNUP-002 failed. Remaining planned manual cases are not run. One exploratory manual attempt to generate test data failed; it is recorded separately in the CSV.
- TypeScript validation: passed (`npm run typecheck`).
- The configured dashboard account showed zero diagnosis records during this run.

## Defects / observed issues

**SIGNUP-002 — malformed email enables Confirm.** Open the signup page, enter `not-an-email`, then enter matching non-empty passwords. The Confirm button becomes enabled, contrary to the planned invalid-email validation. The form was not submitted, so no account was created. Screenshot: `manual-evidence/SIGNUP-002-invalid-email-confirm-enabled.png`.

**DATA-002 — synthetic diagnosis was not saved to the dashboard.** With explicit approval, a synthetic guest profile was used to complete the symptom questionnaire and reach the AI result page. The app emitted an HTTP 500 and the staff Diagnosis List showed `Total cases: 0`; its list spinner was still visible when the screenshot was captured, so that image records the count at that moment rather than a settled list state. No diagnosis record was observed. This was an exploratory manual attempt, not a completed planned manual test. No further account or diagnosis data was created. Dashboard screenshot: `manual-evidence/DATA-002-dashboard-empty-after-http-500.png`.

## Blocked coverage and next steps

- PAT-001 was skipped because no generated diagnosis appeared in the staff dashboard and `TEST_PATIENT_SEARCH` is not configured.
- PAT-005 was skipped because the diagnosis list was empty; download output could not be verified.
- PAT-002 through PAT-004 and DATA-001 verified filter-control/empty-state behavior only. Correctness of returned rows remains unverified without records.
- SIGNUP-003 and the planned manual cases remain not run. Successful registration and diagnosis creation would create persistent records, so they were not performed automatically.
- Import `TEST_EXECUTION_REPORT.csv` into Google Sheets for the assignment spreadsheet deliverable. No Google Sheet was created from this workspace.
- Google Sheets requires signing in to a Google account; this session is not authenticated. The CSV is ready for `Google Sheets → Blank spreadsheet → File → Import → Upload`.
- Manual steps, expected/actual results, and screenshot evidence are collected in `MANUAL_TEST_REPORT.md`; image files are in `manual-evidence/`.
