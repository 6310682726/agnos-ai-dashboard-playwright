import { expect, test, loginAsTestUser } from './fixtures';

test.describe('Patient records', () => {
  test.beforeEach(async ({ loginPage, dashboardPage, patientListPage }) => {
    await loginAsTestUser(loginPage, dashboardPage);
    await patientListPage.expectLoaded();
  });

  test('PAT-001 - finds a generated test record by its configured identifier', async ({ patientListPage }) => {
    const searchTerm = process.env.TEST_PATIENT_SEARCH;
    if (!searchTerm) {
      test.skip(true, 'Requires a generated test record and TEST_PATIENT_SEARCH in .env.');
      return;
    }

    await patientListPage.search(searchTerm);
    await patientListPage.expectRecordVisible(searchTerm);
  });

  test('PAT-002 - changes the selected triage filter', async ({ patientListPage }) => {
    await patientListPage.toggleTriageFilter(process.env.TEST_TRIAGE_LEVEL ?? 'Urgent');
  });

  test('PAT-003 - applies a date preset', async ({ patientListPage }) => {
    await patientListPage.selectDatePreset(process.env.TEST_DATE_PRESET ?? 'Today');
  });

  test('PAT-004 - changes the selected channel filter', async ({ patientListPage }) => {
    await patientListPage.toggleChannelFilter(process.env.TEST_CHANNEL ?? 'Vimut hospital');
  });

  test('PAT-005 - downloads a readable patient-record export', async ({ patientListPage }) => {
    if (await patientListPage.getCaseCount() === 0) {
      test.skip(true, 'No diagnosis records exist; create a synthetic test record before testing export.');
      return;
    }

    const download = await patientListPage.downloadRecords();
    expect(download.filename).not.toBe('');
    expect(download.bytes).toBeGreaterThan(0);
    expect(download.header).not.toBe('');
  });

  test('PAT-006 - shows the empty state for a search with no matches', async ({ patientListPage }) => {
    await patientListPage.search(`no-match-${Date.now()}`);
    await patientListPage.expectEmptyState();
    await expect(patientListPage.getCaseCount()).resolves.toBe(0);
  });

  test('DATA-001 - maintains the empty state when combining filters', async ({ patientListPage }) => {
    if (await patientListPage.getCaseCount() !== 0) {
      test.skip(true, 'This empty-state check applies only when there are no diagnosis records.');
      return;
    }

    await patientListPage.toggleTriageFilter(process.env.TEST_TRIAGE_LEVEL ?? 'Urgent');
    await patientListPage.selectDatePreset(process.env.TEST_DATE_PRESET ?? 'Today');
    await patientListPage.toggleChannelFilter(process.env.TEST_CHANNEL ?? 'Vimut hospital');
    await patientListPage.expectEmptyState();
    await expect(patientListPage.getCaseCount()).resolves.toBe(0);
  });
});
