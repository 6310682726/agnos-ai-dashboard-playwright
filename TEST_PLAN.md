# Agnos AI Dashboard test plan

| Test ID | Title | Preconditions | Steps | Expected Result | Priority |
|---|---|---|---|---|---|
| AUTH-001 | Register a new dashboard user | Signup page is reachable; unique email available | Open signup; enter valid required details; submit; verify confirmation | Account is created and user is directed to login or dashboard | High |
| AUTH-002 | Reject invalid registration data | Signup page is reachable | Submit empty, malformed, duplicate, and mismatched fields | Inline validation identifies each invalid field; no account is created | High |
| AUTH-003 | Login with valid credentials | Active account exists | Open login; enter valid username/password; submit | Dashboard loads and authenticated navigation is visible | Critical |
| AUTH-004 | Reject invalid credentials | Login page is reachable | Enter invalid username/password; submit | Clear error is shown and dashboard is not opened | High |
| AUTH-005 | Logout | User is logged in | Select Logout/Sign out; attempt to revisit protected page | Session ends and login page is shown; protected page requires login | Critical |
| DASH-001 | Navigate dashboard tabs | User is logged in | Open dashboard, patient records, statistics, and other visible tabs | Correct page loads for each tab; active navigation state is updated | High |
| PAT-001 | Search patient record | User is logged in; records exist | Open patient list; search by patient ID/name; submit | Matching record is displayed; nonmatching records are excluded | High |
| PAT-002 | Filter by triage level | Patient list contains multiple triage levels | Select triage level and apply | Only records with the selected triage level are shown | High |
| PAT-003 | Filter by date range | Patient list contains dated records | Set valid start/end dates and apply | Results fall within the inclusive date range | Medium |
| PAT-004 | Filter by channel | Records exist from multiple channels | Select channel and apply | Only records from selected channel are shown | Medium |
| PAT-005 | Download records | User is logged in; records are available | Select Download/Export; save file | Download starts, file is readable, and exported data matches applied filters | High |
| SIGNUP-001 | Prevent duplicate signup | Existing account email is known | Register with an existing email | Duplicate-account error is shown and no second account is created | Medium |
| DATA-001 | Combine filters | Records support all filter dimensions | Apply triage, date, and channel filters together | Results satisfy every selected criterion | Medium |
