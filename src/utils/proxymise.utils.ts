import proxymise from 'proxymise';
import { BasePage } from '@pages/base/base.page';

export function createProxymisedPage<T extends BasePage>(
  PageClass: new (...args: any[]) => T,
): ProxymisedPage<T, typeof PageClass> {
  return proxymise(PageClass) as unknown as ProxymisedPage<T, typeof PageClass>;
}
