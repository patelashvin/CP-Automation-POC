import { devices } from '@playwright/test';

export const STORAGE_STATE_LOGIN = '.playwright/.auth/user.json';

export const project = [
  {
    name: 'setup',
    testMatch: '**/*.setup.ts',
    use: {
      ...devices['Desktop Chrome'],
      viewport: { width: 1600, height: 1000 },
      launchOptions: {
        args: ['--disable-web-security'],
        slowMo: 0,
      },
    },
    teardown: 'teardown',
  },
  {
    name: 'teardown',
    testMatch: '**/*.teardown.ts',
  },

  /** Due to different view ports in Head and Headless, created 2 projects one for head mode and the same browser for headless. */
  {
    name: 'chromium',
    dependencies: ['setup'],
    use: {
      viewport: null,
      // Set the storage state here if you have only one user to login.
      storageState: STORAGE_STATE_LOGIN,
      launchOptions: {
        args: ['--disable-web-security', '--start-maximized'],
        /* --auto-open-devtools-for-tabs option is used to open a test with Network tab for debugging. It can help in analyzing network requests and responses.*/
        // args: ["--auto-open-devtools-for-tabs"],
        // channel: 'chrome',
        slowMo: process.env.DEBUG === 'true' ? 900 : 0, //900 - to slowdown execution
        headless: false,
      },
    },
  },

  {
    name: 'chromiumheadless',
    dependencies: ['setup'],
    use: {
      ...devices['Desktop Chrome'],
      viewport: { width: 1600, height: 1000 },
      storageState: STORAGE_STATE_LOGIN,
      launchOptions: {
        args: ['--disable-web-security'],
        // channel: 'chrome',
        slowMo: 0,
        headless: true,
      },
    },
  },

  /******* Uncomment to run tests in other browsers
      {
        name: 'firefox',
        use: {
          ...devices['Desktop Firefox'],
          viewport: { width: 1600, height: 1000 },
          launchOptions: {
            firefoxUserPrefs: {
              'browser.cache.disk.enable': false,
              'browser.cache.memory.enable': false,
            },
          },
        },
      },

      {
        name: 'webkit',
        use: {
          ...devices['Desktop Safari'],
          viewport: { width: 1600, height: 1000 },
        },
      },

      // Test against mobile viewports.
      {
        name: 'Mobile Chrome',
        use: { ...devices['Pixel 5'] },
      },
      {
        name: 'Mobile Safari',
        use: { ...devices['iPhone 12'] },
      },

      // Test against branded browsers.
      {
        name: 'Microsoft Edge',
        use: { ...devices['Desktop Edge'], channel: 'msedge' },
      },
      {
        name: 'Google Chrome',
        use: { ...devices['Desktop Chrome'], channel: 'chrome' },
      },

    ***************/
];
