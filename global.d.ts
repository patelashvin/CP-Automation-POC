import type { Locator, Page } from '@playwright/test';
import type { BasePage } from '@pages/base/base.page';

declare global {
  interface IPageObject {
    ClickAdminHubBtn(): Promise<IPageObject>;
    SwitchCustomer(customer: string): Promise<IPageObject>;
    CreateUser(firstName: string, lastName: string, email: string): Promise<IPageObject>;
    DeleteUser(): Promise<IPageObject>;
  }

  type PromisifiedLocator = {
    [K in keyof Locator]: Locator[K] extends (...args: infer A) => Promise<infer R>
      ? (...args: A) => Promise<R>
      : Locator[K] extends (...args: infer A) => infer R
        ? (...args: A) => Promise<R>
        : Locator[K];
  };

  type ProxymisedPage<T extends BasePage, S = typeof BasePage> = {
    [K in keyof S]: S[K] extends (page: Page, ...args: infer P) => Promise<IPageObject>
      ? (page: Page, ...args: P) => ProxymisedPage<T, S> & IPageObject
      : S[K];
  } & {
    [K in keyof T]: T[K] extends Locator
      ? PromisifiedLocator
      : T[K] extends (...args: infer A) => Promise<IPageObject>
        ? (...args: A) => ProxymisedPage<T, S> & IPageObject
        : T[K];
  } & {
    new (page: Page): T;
  };

  type PageObjectClass<T extends BasePage> = ProxymisedPage<T, typeof BasePage> & {
    open(page: Page): Promise<ProxymisedPage<T, typeof BasePage> & IPageObject>;
  };
}

export {};
