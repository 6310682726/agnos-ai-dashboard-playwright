import { expect, Page } from '@playwright/test';

export class DashboardPage {
  constructor(protected readonly page: Page) {}

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/ai_dashboard/);
    await expect(
      this.page.getByRole('heading', { name: /dashboard|overview|patient/i }).first()
    ).toBeVisible();
  }

  async openPatientList(): Promise<void> {
    await this.page.getByRole('link', { name: /patient|record|case/i }).first().click();
  }

  async openTab(name: string | RegExp): Promise<void> {
    await this.page.getByRole('link', { name }).or(
      this.page.getByRole('tab', { name })
    ).first().click();
  }

  async expectNavigationTabVisible(name: string | RegExp): Promise<void> {
    await expect(this.page.getByRole('link', { name }).or(
      this.page.getByRole('tab', { name })
    ).first()).toBeVisible();
  }
}
