import { expect, Page } from '@playwright/test';

export class SignupPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    const url = process.env.AGNOS_SIGNUP_URL ??
      'https://dev.app.agnoshealth.com/ai_dashboard/agnos/sign_up';
    await this.page.goto(url);
    await expect(this.page.getByRole('button', { name: /sign up|register|create|confirm/i }).first()).toBeVisible();
  }

  async expectRequiredRegistrationFields(): Promise<void> {
    await expect(this.page.locator('input[type="email"]').first()).toBeVisible();
    await expect(this.page.locator('input[type="password"]').nth(0)).toBeVisible();
    await expect(this.page.locator('input[type="password"]').nth(1)).toBeVisible();
    await expect(
      this.page.getByRole('button', { name: /sign up|register|create|confirm/i }).first()
    ).toBeDisabled();
  }
}
