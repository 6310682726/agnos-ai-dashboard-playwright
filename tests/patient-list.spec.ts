import { test, loginAsTestUser } from './fixtures';

test.describe('Patient records', () => {
  test.beforeEach(async ({ loginPage, dashboardPage, patientListPage }) => {
    await loginAsTestUser(loginPage, dashboardPage);
    await dashboardPage.openPatientList();
    await patientListPage.expectLoaded();
  });

  test('PAT-001 - searches for a patient record', async ({ patientListPage }) => {
    await patientListPage.search(process.env.TEST_PATIENT_SEARCH ?? 'test');
    await patientListPage.expectRecordVisible(process.env.TEST_PATIENT_SEARCH ?? 'test');
  });

  test('PAT-002 - filters records by triage level', async ({ patientListPage }) => {
    await patientListPage.filterByTriage(process.env.TEST_TRIAGE_LEVEL ?? 'High');
  });

  test('PAT-003 - filters records by date range', async ({ patientListPage }) => {
    await patientListPage.filterByDateRange('2025-01-01', '2025-12-31');
  });

  test('PAT-004 - filters records by channel', async ({ patientListPage }) => {
    await patientListPage.filterByChannel(process.env.TEST_CHANNEL ?? 'Web');
  });

  test('PAT-005 - downloads patient records', async ({ patientListPage }) => {
    await patientListPage.downloadRecords();
  });
});
