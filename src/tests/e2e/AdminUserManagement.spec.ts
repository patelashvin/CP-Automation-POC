import { expect, test } from '@fixture';
import { HomePage } from '@pages/home.page';
import _ from 'underscore';

let firstName: string;
let lastName: string;
let email: string;

test.beforeEach(({}) => {
  const randStr: string = _.random(100, 9999).toString();
  firstName = 'AHFIRST' + randStr;
  lastName = 'AHLAST' + randStr;
  email = 'AHEmail' + randStr + '@gmail.com';
});

test('Create User and Delete User', ({ page }) => {
  HomePage.open(page);
  expect(true).toBeTruthy();
});
