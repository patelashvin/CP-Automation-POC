// global.d.ts

import type { Locator, Page } from '@playwright/test';
import type { BasePage } from 'src/pages/base.page';

declare module 'underscore';

declare global {
  type PromisifiedLocator = {
    [K in keyof Locator]: Locator[K] extends (...args: infer A) => Promise<infer R>
      ? (...args: A) => Promise<R>
      : Locator[K] extends (...args: infer A) => infer R
        ? (...args: A) => Promise<R>
        : Locator[K];
  };

  type ProxymisedPage<T, S = typeof BasePage> = {
    [K in keyof S]: S[K] extends (page: Page, ...args: infer P) => Promise<T>
      ? (page: Page, ...args: P) => ProxymisedPage<T, S>
      : S[K];
  } & {
    [K in keyof T]: T[K] extends Locator
      ? PromisifiedLocator
      : T[K] extends (...args: infer A) => Promise<T>
        ? (...args: A) => ProxymisedPage<T, S>
        : T[K];
  } & {
    new (page: Page): T;
  };
}
export {};
