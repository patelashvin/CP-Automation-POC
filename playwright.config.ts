import { ACTION_TIMEOUT, EXPECT_TIMEOUT, NAVIGATION_TIMEOUT, TEST_TIMEOUT } from '@utils/timeout.const';
import { defineConfig } from '@playwright/test';
import { project } from 'project.config';
import dotenv from 'dotenv';
import os from 'os';

dotenv.config({ path: '.env' });

export const BASE_URL = process.env.URL || 'https://q-centralpark.parkplacetechnologies.net';

interface Credentials {
  baseUrl: string | undefined;
  username: string | undefined;
  password: string | undefined;
}

type Env = 'dev' | 'qa' | 'prod';

type EnvConfig = {
  [key in Env]: Credentials;
};

export const envConfig: EnvConfig = {
  dev: {
    baseUrl: process.env.DEV_CP_URL,
    username: process.env.DEV_CP_GA_USERNAME,
    password: process.env.DEV_CP_GA_PASSWORD,
  },
  qa: {
    baseUrl: process.env.QA_CP_URL,
    username: process.env.QA_CP_GA_USERNAME,
    password: process.env.QA_CP_GA_PASSWORD,
  },
  prod: {
    baseUrl: process.env.PROD_CP_URL,
    username: process.env.PROD_CP_GA_USERNAME,
    password: process.env.PROD_CP_GA_PASSWORD,
  },
};

export function getEnvironment(): Credentials {
  const cpEnv: Env = ['dev', 'qa', 'prod'].includes(process.env.TEST_ENV as Env) ? (process.env.TEST_ENV as Env) : 'qa';
  return envConfig[cpEnv];
}

export default defineConfig({
  testDir: '.',
  outputDir: './.playwright/reports',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 3 : 1,
  reporter: [['html', { outputFolder: './.playwright/reports', open: 'never' }], ['list']],
  timeout: TEST_TIMEOUT,
  expect: {
    timeout: EXPECT_TIMEOUT,
  },
  use: {
    headless: true,
    ignoreHTTPSErrors: true,
    acceptDownloads: true,
    baseURL: BASE_URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    actionTimeout: ACTION_TIMEOUT,
    navigationTimeout: NAVIGATION_TIMEOUT,
  },

  /**
   * Configure projects for major browsers.
   * See https://playwright.dev/docs/test-configuration#projects
   */
  projects: [...project],

  /**
   * If the tests are being run on localhost, this configuration starts a web server.
   * See https://playwright.dev/docs/test-webserver#configuring-a-web-server
   */
  webServer: {
    cwd: `${os.homedir()}/repos/ui`, // You can also use the relative path to the UI repo
    command: 'npm start ui-server', // Start the UI server
    url: BASE_URL,
    ignoreHTTPSErrors: true,
    timeout: 2 * 60 * 1000,
    reuseExistingServer: true,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
