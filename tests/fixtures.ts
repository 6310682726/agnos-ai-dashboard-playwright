import { test as base } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';
import { PatientListPage } from '../pages/PatientListPage';
import { SignupPage } from '../pages/SignupPage';

type Fixtures = {
  loginPage: LoginPage;
  signupPage: SignupPage;
  dashboardPage: DashboardPage;
  patientListPage: PatientListPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  signupPage: async ({ page }, use) => use(new SignupPage(page)),
  dashboardPage: async ({ page }, use) => use(new DashboardPage(page)),
  patientListPage: async ({ page }, use) => use(new PatientListPage(page))
});

export { expect } from '@playwright/test';

export async function loginAsTestUser(
  loginPage: LoginPage,
  dashboardPage: DashboardPage
): Promise<void> {
  const username = process.env.AGNOS_USERNAME;
  const password = process.env.AGNOS_PASSWORD;
  if (!username || !password) {
    throw new Error('AGNOS_USERNAME and AGNOS_PASSWORD must be set in the environment.');
  }
  await loginPage.goto();
  await loginPage.login(username, password);
  await dashboardPage.expectLoaded();
}
