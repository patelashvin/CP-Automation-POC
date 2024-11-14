import { Page } from '@playwright/test';
import { createProxymisedPage } from '@utils/proxymise.utils';
import { BasePage } from '@pages/base/base.page';

class HomePO extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public static async open(page: Page): Promise<IPageObject> {
    await page.goto('/dashboard');
    await page.waitForLoadState('domcontentloaded');
    return new HomePO(page) as unknown as IPageObject;
  }
}

const HomePage = createProxymisedPage(HomePO);
export { HomePage };
