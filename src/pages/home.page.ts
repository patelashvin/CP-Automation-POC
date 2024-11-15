import { Page } from '@playwright/test';
import { createProxymisedPage } from '@utils/proxymise.utils';
import { BasePage } from '@pages/base/base.page';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IHomePage extends BasePage {}
export class HomePO extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public static async open(page: Page): Promise<HomePO> {
    await page.goto('/dashboard');
    await page.waitForLoadState('domcontentloaded');
    return new HomePO(page);
  }
}

const HomePage = createProxymisedPage<HomePO>(HomePO);
export { HomePage };
