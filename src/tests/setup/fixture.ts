import { test as baseTest } from '@playwright/test';
import { STORAGE_STATE_LOGIN } from 'project.config';

type WorkerFixture = {
  workerFixture: string;
};

type TestFixture = {
  testFixure: { [k: string]: string };
};

export const test = baseTest.extend<TestFixture, WorkerFixture>({
  workerFixture: [
    async ({}, use) => {
      // console.log('BEFORE EACH WORKER FROM FIXTURE');
      await use('workerFixure');
      // console.log('BEFORE EACH WORKER FROM FIXTURE');
    },
    { scope: 'worker' },
  ],

  testFixure: [
    async ({}, use) => {
      // console.log('BEFORE EACH HOOK TEST FROM FIXTURE');
      await use({ storageState: STORAGE_STATE_LOGIN });
      // console.log('AFTER EACH HOOK TEST FIXTURE');
    },
    { scope: 'test', auto: true },
  ],
});

export const { expect } = baseTest;
