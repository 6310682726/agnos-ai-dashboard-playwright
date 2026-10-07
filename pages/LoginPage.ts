import { expect, Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  private get usernameInput() {
    return this.page.locator('input[type="email"]').first();
  }

  private get passwordInput() {
    return this.page.locator('input[type="password"]').first();
  }

  async goto(): Promise<void> {
    const url = process.env.AGNOS_DASHBOARD_URL ??
      'https://dev.app.agnoshealth.com/ai_dashboard';
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    await expect(this.usernameInput).toBeVisible();
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.page.getByRole('button', { name: /log ?in|sign ?in/i }).click();
  }

  async expectLoginError(): Promise<void> {
    await expect(
      this.page.getByText(/invalid|incorrect|failed|wrong|unable to login/i).first()
    ).toBeVisible();
    await expect(this.usernameInput).toBeVisible();
  }

  async expectLoggedIn(): Promise<void> {
    await expect(this.page).toHaveURL(/ai_dashboard/);
    await expect(this.page.getByText('Diagnosis List', { exact: true }).first()).toBeVisible();
    await expect(this.page.getByRole('button', { name: /log out/i })).toBeVisible();
  }

  async logout(): Promise<void> {
    await this.page.getByRole('button', { name: /log out/i }).click();
  }

  async expectLoggedOut(): Promise<void> {
    await expect(this.page).toHaveURL(/ai_dashboard/);
    await expect(this.usernameInput).toBeVisible();
    await expect(this.page.getByRole('button', { name: /log ?in|sign ?in/i })).toBeVisible();
  }
}
