/* eslint-disable @typescript-eslint/no-unsafe-argument */
import proxymise from 'proxymise';
import { BasePage } from '@pages/base/base.page';
import { Page } from 'playwright';

function extractLocators<T extends BasePage>(instance: T) {
  return Object.entries(instance).reduce(
    (acc, [key, value]) => {
      if (key.startsWith('$') && value && typeof value === 'object' && 'click' in value) {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, any>,
  );
}

function extractMethods<T extends BasePage>(instance: T) {
  return Object.entries(instance).reduce(
    (acc, [key, value]) => {
      if (typeof value === 'function') {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, any>,
  );
}

function createProxyHandler() {
  return {
    get(target: any, prop: string) {
      if (prop === 'Locators') {
        return target.Locators;
      }
      if (typeof target[prop] === 'function') {
        return target[prop];
      }
      if (target.Locators && prop in target.Locators) {
        return target.Locators[prop];
      }
      return undefined;
    },
    ownKeys(target: any) {
      return [...Object.keys(target).filter(key => typeof target[key] === 'function'), 'Locators'];
    },
    has(target: any, prop: string) {
      return prop === 'Locators' || typeof target[prop] === 'function' || (target.Locators && prop in target.Locators);
    },
  };
}

export function createProxymisedPage<T extends BasePage>(
  PageClass: new (page: Page, ...args: any[]) => T,
): PageObjectClass<T> {
  const proxiedClass = proxymise(PageClass) as any;

  return new Proxy(proxiedClass, {
    construct(target, args) {
      const instance = new target(...args);
      const cleanInstance = {
        ...extractMethods(instance),
        Locators: extractLocators(instance),
      };
      return new Proxy(cleanInstance, createProxyHandler());
    },
  }) as PageObjectClass<T>;
}
