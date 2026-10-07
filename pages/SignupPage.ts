import { expect, Page } from '@playwright/test';

export class SignupPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    const url = process.env.AGNOS_SIGNUP_URL ??
      'https://dev.app.agnoshealth.com/ai_dashboard/agnos/sign_up';
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    await expect(this.page.getByText('Create Account', { exact: true })).toBeVisible();
  }

  async expectRequiredRegistrationFields(): Promise<void> {
    const inputs = this.page.locator('input');
    await expect(inputs).toHaveCount(3);
    await expect(inputs.nth(0)).toBeVisible();
    await expect(inputs.nth(1)).toBeVisible();
    await expect(inputs.nth(2)).toBeVisible();
    await expect(this.confirmButton).toBeDisabled();
  }

  async enterInvalidRegistrationDetails(): Promise<void> {
    const inputs = this.page.locator('input');
    await inputs.nth(0).fill('not-an-email');
    await inputs.nth(1).fill('Test-only-password-123');
    await inputs.nth(2).fill('Test-only-password-123');
  }

  async expectConfirmationDisabled(): Promise<void> {
    await expect(this.confirmButton).toBeDisabled();
  }

  private get confirmButton() {
    return this.page.getByRole('button', { name: 'Confirm', exact: true });
  }
}
