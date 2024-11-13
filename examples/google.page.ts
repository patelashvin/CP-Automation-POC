import { Locator, Page } from '@playwright/test';
import { BasePage } from '@pages/base/base.page';
import { createProxymisedPage } from '@proxymise-page';

class GooglePO extends BasePage {
  public readonly $textareaInput: Locator;

  constructor(page: Page) {
    super(page);
    this.$textareaInput = page.locator('textarea[aria-label="Search"]');
  }

  public static async open(page: Page): Promise<GooglePO> {
    await page.goto('https://www.google.com/');
    await page.waitForLoadState('domcontentloaded');
    return new GooglePO(page);
  }

  public async inputSearch(text: string): Promise<GooglePO> {
    await this.$textareaInput.waitFor({ state: 'visible' });
    await this.$textareaInput.fill(text);
    return this;
  }

  public async pressEnter(): Promise<GooglePO> {
    await this.$textareaInput.waitFor({ state: 'visible' });
    await this.$textareaInput.press('Enter');
    return this;
  }
}

const GooglePage = createProxymisedPage(GooglePO);
export { GooglePage };
