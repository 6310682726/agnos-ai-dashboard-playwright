import { expect, Page } from '@playwright/test';

export class PatientListPage {
  constructor(private readonly page: Page) {}

  private get searchInput() {
    return this.page.getByPlaceholder(/search/i).or(
      this.page.getByRole('textbox', { name: /search/i })
    ).first();
  }

  async expectLoaded(): Promise<void> {
    await expect(this.searchInput).toBeVisible();
  }

  async search(value: string): Promise<void> {
    await this.searchInput.fill(value);
    const searchButton = this.page.getByRole('button', { name: /search/i });
    if (await searchButton.isVisible().catch(() => false)) {
      await searchButton.click();
    } else {
      await this.searchInput.press('Enter');
    }
  }

  async expectRecordVisible(value: string): Promise<void> {
    await expect(this.page.getByText(value, { exact: false }).first()).toBeVisible();
  }

  async filterByTriage(level: string): Promise<void> {
    await this.selectFilter(/triage|priority/i, level);
  }

  async filterByChannel(channel: string): Promise<void> {
    await this.selectFilter(/channel|source/i, channel);
  }

  async filterByDateRange(start: string, end: string): Promise<void> {
    const dateInputs = this.page.locator('input[type="date"]');
    if (await dateInputs.count() >= 2) {
      await dateInputs.nth(0).fill(start);
      await dateInputs.nth(1).fill(end);
    } else {
      await this.page.getByLabel(/from|start/i).fill(start);
      await this.page.getByLabel(/to|end/i).fill(end);
    }
    await this.applyFilters();
  }

  async downloadRecords(): Promise<void> {
    const downloadPromise = this.page.waitForEvent('download');
    await this.page.getByRole('button', { name: /download|export/i }).click();
    await downloadPromise;
  }

  private async selectFilter(label: RegExp, value: string): Promise<void> {
    const select = this.page.getByLabel(label).first();
    if (await select.isVisible().catch(() => false)) {
      await select.selectOption({ label: value }).catch(async () => select.selectOption(value));
    } else {
      await this.page.getByRole('button', { name: label }).click();
      await this.page.getByRole('option', { name: value }).click();
    }
    await this.applyFilters();
  }

  private async applyFilters(): Promise<void> {
    const apply = this.page.getByRole('button', { name: /apply|filter/i }).first();
    if (await apply.isVisible().catch(() => false)) {
      await apply.click();
    }
    await this.page.waitForLoadState('networkidle').catch(() => undefined);
  }
}
