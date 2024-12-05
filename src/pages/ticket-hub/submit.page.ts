import { Locator, Page } from '@playwright/test';
import { createProxymisedPage } from '@utils/proxymise.utils';
import { BasePage } from '@pages/base/base.page';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ISubmitPage extends BasePage {}
export class SubmitPO extends BasePage {
  public readonly $softwareTicketBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.$softwareTicketBtn = this.page.getByRole('button', { name: ' Software Ticket' });
  }

  public static async open(page: Page): Promise<SubmitPO> {
    await page.goto('/ticket-hub/submit');
    await page.waitForLoadState('domcontentloaded');
    return new SubmitPO(page);
  }
}

const SubmitPage = createProxymisedPage<SubmitPO>(SubmitPO);
export { SubmitPage };
