import { test as baseTest } from '@playwright/test';

type WorkerFixture = {
  workerFixture: string;
};

type TestFixture = {
  testFixure: string;
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
      await use('testFixure');
      // console.log('AFTER EACH HOOK TEST FIXTURE');
    },
    { scope: 'test', auto: false },
  ],
});

export const { expect } = baseTest;
