# Agnos AI Dashboard test plan

## Scope and test data

The target is the staff-facing AI dashboard at `AGNOS_DASHBOARD_URL`. The dashboard currently exposes a Diagnosis List with case-status tabs, triage chips, a date-preset picker, a channel filter, search, and download.

Use only synthetic test data. Create a test diagnosis through `AGNOS_PATIENT_URL` before running cases that need a matching record or exported rows. Store its non-identifying record ID in `TEST_PATIENT_SEARCH`; do not put real patient information in test data, screenshots, traces, or reports.

## Detailed test case design

`TEST_CASES.tsv` is the full test-case matrix for Registration/Login/Logout, Navigation, Search, Triage, Date, Channel, combined filters, and Download. It uses the requested spreadsheet columns and is tab-separated for direct paste or import into Google Sheets. The matrix includes positive, negative, and boundary/security cases. These are designed cases, not execution results.

Triage correctness must be compared with the source record and an approved clinical severity mapping; this plan does not define or infer clinical criteria. Use synthetic records only. Do not run account-creation or export cases against real patient data.

## Test cases

| Test ID | Scenario | Preconditions | Steps | Expected result | Automation coverage | Manual status |
|---|---|---|---|---|---|---|
| SIGNUP-001 | Registration form required fields | Signup page is reachable | Open signup page | E-mail, password, and confirmation fields are visible; Confirm is disabled | Automated | Pass |
| SIGNUP-002 | Reject malformed registration email | Signup page is reachable | Enter an invalid email and matching test-only passwords; do not submit | Confirm remains disabled | Automated | Fail: Confirm became enabled |
| SIGNUP-003 | Register a new dashboard user | A unique disposable/test email is available | Enter valid details and submit once | Account is created and a confirmation or next-step state is shown | Manual only; creates an account | Not Run |
| AUTH-001 | Login with valid credentials | Active test account is configured in `.env` | Login with configured credentials | Diagnosis List and Log Out are visible | Automated | Not Run |
| AUTH-002 | Reject invalid credentials | Login page is reachable | Submit an invalid email/password pair | Login error is visible and the login form remains available | Automated | Not Run |
| AUTH-003 | Logout | User is logged in | Select Log Out | Login form is shown and the authenticated view is no longer visible | Automated | Not Run |
| DASH-001 | Change case-status view | User is logged in | Select Open, In progress, and Completed | Each selected status is visibly active; Diagnosis List remains available | Automated | Not Run |
| PAT-001 | Search for a generated record | A synthetic record exists and `TEST_PATIENT_SEARCH` is set | Search using its exact record identifier | The matching record appears; unrelated records do not | Automated; skipped without configured test data | Not Run |
| PAT-002 | Filter by triage | User is logged in | Toggle the configured triage chip | The chip's selected state changes and visible records match the selected triage | Automated UI-state check; result validation requires populated data | Not Run |
| PAT-003 | Filter by date | User is logged in | Select the configured date preset | The selected preset is shown and the records match that date range | Automated UI-state check; result validation requires populated data | Not Run |
| PAT-004 | Filter by channel | User is logged in | Toggle the configured channel | The channel selection changes and visible records match the selected channel | Automated UI-state check; result validation requires populated data | Not Run |
| PAT-005 | Download patient records | At least one synthetic diagnosis record exists | Select Download | A readable, non-empty export is downloaded | Automated; skipped when the list is empty | Not Run |
| PAT-006 | Search with no matching record | User is logged in | Search for a unique identifier that does not exist | The empty-state message is shown and the total case count is zero | Automated | Not Run |
| DATA-001 | Combine triage, date, and channel filters | User is logged in; populated test data is needed to validate returned rows | Apply all three filters | Every returned record satisfies all selected criteria | Empty-state path automated; positive result validation requires populated data | Not Run |
| DATA-002 | Generate a synthetic AI diagnosis | User consents to the test profile and synthetic data; development app is available | Complete the synthetic profile and symptom-analysis flow | AI result is shown and a corresponding diagnosis becomes visible in the staff dashboard | Exploratory manual check | Fail: result page emitted HTTP 500; diagnosis was not visible in the dashboard |

## Run notes

- Automated execution is recorded in `TEST_EXECUTION_REPORT.csv`; test IDs in that report and this plan are kept aligned.
- Manual execution is deliberately tracked separately. An automated browser run is not reported as a manual test.
- The latest automated run showed zero diagnosis cases. Until a synthetic record is created, PAT-001 and PAT-005 are skipped, and PAT-002 through PAT-004 only verify filter-control interaction—not that record filtering returns correct rows.
- SIGNUP-002 currently fails: the Confirm button becomes enabled for a malformed email. The test does not submit the form.
- Successful registration and diagnosis creation are not run automatically because they create persistent records in the development environment.
- An explicitly approved synthetic guest diagnosis attempt reached the AI results page but emitted HTTP 500; the staff dashboard continued to show zero cases. See `TEST_EXECUTION_REPORT.csv` and `TEST_EXECUTION_SUMMARY.md`.
