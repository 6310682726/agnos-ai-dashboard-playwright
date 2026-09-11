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
    await this.page.goto(url);
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
  }

  async expectLoggedIn(): Promise<void> {
    await expect(this.page).toHaveURL(/ai_dashboard/);
    await expect(
      this.page.getByRole('link', { name: /logout|sign out/i }).or(
        this.page.getByRole('button', { name: /logout|sign out|profile/i })
      ).first()
    ).toBeVisible();
  }

  async logout(): Promise<void> {
    const logout = this.page.getByRole('link', { name: /logout|sign out/i }).or(
      this.page.getByRole('button', { name: /logout|sign out/i })
    ).first();
    await logout.click();
  }

  async expectLoggedOut(): Promise<void> {
    await expect(this.page).toHaveURL(/ai_dashboard/);
    await expect(this.usernameInput).toBeVisible();
  }
}
