/**
 * This module is responsible for setting up the global state before all tests start.
 * It includes a default export function that runs before all tests, setting up any necessary global context.
 * By centralizing these setup operations, it ensures a consistent starting point for all tests, improving test reliability.
 * You can add any initialization setup code within this function.
 */

import { test as setup } from '@playwright/test';
import { BASE_URL } from '@playwright-config';
import path from 'path';

export const STORAGE_STATE_PATH = path.join(__dirname, 'playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.context().storageState({ path: STORAGE_STATE_PATH });
  await page.close();
});
