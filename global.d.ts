import type { Locator, Page } from '@playwright/test';
import type { BasePage } from '@pages/base/base.page';

declare global {
  type ChainableInstance<T> = {
    [P in keyof T]: T[P] extends (...args: infer A) => Promise<infer R>
      ? (...args: A) => ChainableInstance<R>
      : T[P] extends (...args: infer A) => any
        ? (...args: A) => ChainableInstance<T>
        : T[P];
  };

  type PromisifiedLocator = {
    [K in keyof Locator]: Locator[K] extends (...args: infer A) => Promise<infer R>
      ? (...args: A) => Promise<R>
      : Locator[K] extends (...args: infer A) => infer R
        ? (...args: A) => Promise<R>
        : Locator[K];
  };

  interface PageClassWithOpen<T extends BasePage> {
    new (page: Page): T;
    open(page: Page, ...args: any[]): ChainableInstance<T>;
  }

  type ProxymisedPage<T extends BasePage, S = typeof BasePage> = {
    [K in keyof S]: S[K] extends (page: Page) => Promise<any> ? (page: Page) => ChainableInstance<T> : S[K];
  } & {
    [K in keyof T]: T[K] extends Locator
      ? PromisifiedLocator
      : T[K] extends (...args: infer A) => Promise<any>
        ? (...args: A) => ChainableInstance<T>
        : T[K];
  } & PageClassWithOpen<T>;

  type PageObjectClass<T extends BasePage> = ProxymisedPage<T, typeof BasePage>;
}

export {};
