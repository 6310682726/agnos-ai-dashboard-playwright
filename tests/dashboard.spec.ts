import { test, loginAsTestUser } from './fixtures';

test.describe('Diagnosis list navigation', () => {
  test('DASH-001 - switches between open, in-progress, and completed cases', async ({ loginPage, dashboardPage }) => {
    await loginAsTestUser(loginPage, dashboardPage);
    for (const status of ['Open', 'In progress', 'Completed']) {
      await dashboardPage.selectCaseStatus(status);
      await dashboardPage.expectCaseStatusSelected(status);
    }
    await dashboardPage.selectCaseStatus('Open');
    await dashboardPage.expectCaseStatusSelected('Open');
  });
});
