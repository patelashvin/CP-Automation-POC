import proxymise from 'proxymise';
import { Page } from '@playwright/test';
import { BasePage } from 'src/pages/base.page';

export function createProxymisedPage<T extends BasePage, S extends new (...args: any[]) => T>(
  PageClass: S & { open?: (page: Page) => Promise<T> },
): ProxymisedPage<T, S> {
  return proxymise(PageClass) as unknown as ProxymisedPage<T, S>;
}
