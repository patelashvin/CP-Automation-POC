import proxymise from 'proxymise';
import { Page } from '@playwright/test';
import { BasePage } from '@pages/base/base.page';

export function createProxymisedPage<T extends BasePage, S extends new (...args: any[]) => T>(
  PageClass: S & { open?: (page: Page, ...args: any[]) => Promise<IPageObject> },
): ProxymisedPage<T, S> & IPageObject {
  return proxymise(PageClass) as unknown as ProxymisedPage<T, S> & IPageObject;
}
