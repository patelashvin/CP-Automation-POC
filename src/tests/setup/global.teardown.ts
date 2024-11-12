/**
 * This module is responsible for tearing down the global state after all tests have completed.
 * It includes a default export function that runs after all tests, cleaning up any necessary global context.
 * By centralizing these teardown operations, it ensures a consistent end state for all tests, improving test reliability.
 * You can add any teardown setup code within this function.
 */

import { Browser, test as teardown } from '@playwright/test';

teardown('Teardown', async ({}) => {
  // console.log('Global teardown: Cleaning up resources after all tests');

  // Assuming you launched a browser in globalSetup or elsewhere
  const browser: Browser = global.__BROWSER__; // If you're sharing browser instance across tests

  // Close the browser
  if (browser) {
    await browser.close();
  }
});
