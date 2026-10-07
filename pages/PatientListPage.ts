import { expect, Page } from '@playwright/test';

export class PatientListPage {
  constructor(private readonly page: Page) {}

  private get searchInput() {
    return this.page.getByRole('textbox', {
      name: 'Patient name, Patient contact, Record ID, Record code'
    });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page.getByText('Diagnosis List', { exact: true }).first()).toBeVisible();
    await expect(this.searchInput).toBeVisible();
    await expect(this.page.getByText(/Total cases\s*:/)).toBeVisible();
  }

  async getCaseCount(): Promise<number> {
    const totalCases = await this.page.getByText(/Total cases\s*:/).innerText();
    const match = totalCases.match(/Total cases\s*:\s*(\d+)/i);
    if (!match) {
      throw new Error(`Could not read the case count from "${totalCases}".`);
    }
    return Number(match[1]);
  }

  async search(value: string): Promise<void> {
    await this.searchInput.fill(value);
    await this.page.getByRole('button', { name: 'Search', exact: true }).click();
  }

  async expectRecordVisible(value: string): Promise<void> {
    await expect(this.page.getByText(value, { exact: false }).first()).toBeVisible();
  }

  async toggleTriageFilter(level: string): Promise<void> {
    const wasSelected = await this.isCheckedFilter(level);
    await this.getFilterCheckbox(level).click();
    await expect.poll(() => this.isCheckedFilter(level)).toBe(!wasSelected);
  }

  async toggleChannelFilter(channel: string): Promise<void> {
    const channelButton = this.page.getByRole('button', { name: /^Channel/ });
    await channelButton.click();
    const wasSelected = await this.isCheckedFilter(channel);
    await this.page.getByText(channel, { exact: true }).click();
    await expect.poll(() => this.isCheckedFilter(channel)).toBe(!wasSelected);
  }

  async selectDatePreset(preset: string): Promise<void> {
    await this.page.getByText(/^(Select date|Today|This week|This month|This year)$/).first().click();
    await this.page.getByText(preset, { exact: true }).click();
    await expect(this.page.getByText(preset, { exact: true }).last()).toBeVisible();
  }

  async expectEmptyState(): Promise<void> {
    await expect(
      this.page.getByRole('cell', { name: 'ยังไม่มีข้อมูลการวินิจฉัย' })
    ).toBeVisible();
  }

  async downloadRecords(): Promise<{ filename: string; bytes: number; header: string }> {
    const downloadPromise = this.page.waitForEvent('download');
    await this.page.getByRole('button', { name: /download Download/i }).click();
    const download = await downloadPromise;
    const stream = await download.createReadStream();
    if (!stream) {
      throw new Error('The browser could not read the downloaded file.');
    }

    let bytes = 0;
    let header = '';
    for await (const chunk of stream) {
      bytes += chunk.length;
      if (!header.includes('\n') && header.length < 8_192) {
        header += chunk.toString('utf8');
      }
    }
    if (await download.failure()) {
      throw new Error('The browser reported a failed download.');
    }

    return {
      filename: download.suggestedFilename(),
      bytes,
      header: header.split(/\r?\n/, 1)[0].trim()
    };
  }

  private async isCheckedFilter(label: string): Promise<boolean> {
    const source = await this.getFilterCheckbox(label).getAttribute('src');
    if (!source?.includes('checkbox-')) {
      throw new Error(`Could not determine whether "${label}" is selected.`);
    }
    return source.includes('checkbox-check-fill');
  }

  private getFilterCheckbox(label: string) {
    return this.page.getByText(label, { exact: true }).first().locator('xpath=../img');
  }
}
