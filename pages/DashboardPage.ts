import { expect, Page } from '@playwright/test';

export class DashboardPage {
  constructor(protected readonly page: Page) {}

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/ai_dashboard/);
    await expect(this.page.getByText('Diagnosis List', { exact: true }).first()).toBeVisible();
    await expect(this.page.getByRole('button', { name: /log out/i })).toBeVisible();
  }

  async openPatientList(): Promise<void> {
    await this.page.getByRole('link', { name: /Diagnosis List/i }).click();
  }

  async selectCaseStatus(status: string): Promise<void> {
    await this.page.getByText(status, { exact: true }).first().click();
  }

  async expectCaseStatusSelected(status: string): Promise<void> {
    const statusLabel = this.page.getByText(status, { exact: true }).first();
    await expect(statusLabel).toBeVisible();
    await expect.poll(() =>
      statusLabel.evaluate((element) => window.getComputedStyle(element).fontWeight)
    ).toBe('700');
  }
}
