/**
 * This module is responsible for setting up the global state before all tests start.
 * It includes a default export function that runs before all tests, setting up any necessary global context.
 * By centralizing these setup operations, it ensures a consistent starting point for all tests, improving test reliability.
 * You can add any initialization setup code within this function.
 */

import { test as setup } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { getEnvironment } from '@playwright-config';
import path from 'path';

const ROOT_DIR = process.cwd();

export const STORAGE_STATE_PATH = path.join(ROOT_DIR, '.playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  const { baseUrl, username, password } = getEnvironment();
  await LoginPage.open(page, baseUrl).ClickLoginBtn().EnterUserName(username).EnterPassword(password);
  await page.context().storageState({ path: STORAGE_STATE_PATH });
  await page.close();
});
