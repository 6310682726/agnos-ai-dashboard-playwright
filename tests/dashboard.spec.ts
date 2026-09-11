import { test, loginAsTestUser } from './fixtures';

test.describe('Dashboard navigation', () => {
  test('DASH-001 - navigates through dashboard tabs', async ({ loginPage, dashboardPage }) => {
    await loginAsTestUser(loginPage, dashboardPage);
    for (const tab of [/dashboard|overview/i, /patient|record/i, /statistic|analytics/i]) {
      await dashboardPage.expectNavigationTabVisible(tab);
      await dashboardPage.openTab(tab);
    }
  });
});
