import { test, loginAsTestUser } from './fixtures';

test.describe('Authentication', () => {
  test('AUTH-001 - logs in with valid credentials', async ({ loginPage, dashboardPage }) => {
    await loginAsTestUser(loginPage, dashboardPage);
  });

  test('AUTH-002 - rejects invalid credentials', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('invalid@example.com', 'invalid-password');
    await loginPage.expectLoginError();
  });

  test('AUTH-003 - logs out successfully', async ({ loginPage, dashboardPage }) => {
    await loginAsTestUser(loginPage, dashboardPage);
    await loginPage.logout();
    await loginPage.expectLoggedOut();
  });
});
