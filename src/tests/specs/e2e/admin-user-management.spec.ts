import { expect, test } from '@fixture';
import { HomePage } from '@pages/home.page';
import _ from 'underscore';

let firstName: string;
let lastName: string;
let email: string;

test.beforeEach(() => {
  const randStr: string = _.random(100, 9999).toString();
  firstName = 'AHFIRST' + randStr;
  lastName = 'AHLAST' + randStr;
  email = 'AHEmail' + randStr + '@gmail.com';
});

test('Create User and Delete User', async ({ page }) => {
  const user = HomePage.open(page)
    .SwitchCustomer('Park Place Technologies LLC')
    .ClickAdminHubBtn()
    .CreateUser(firstName, lastName, email);

  await expect(user.$userFirstName).toHaveValue(firstName);

  user.DeleteUser();
});

test('Create Duplicate User', async ({ page }) => {
  email = 'testautomation@parkplacetech.com';
  HomePage.open(page)
    .SwitchCustomer('Park Place Technologies LLC')
    .ClickAdminHubBtn()
    .CreateUser(firstName, lastName, email);

  await expect(page.getByText('Unable to create user.')).toBeVisible();
});

test('User Search', async ({ page }) => {
  email = 'testautomation@parkplacetech.com';
  const user = HomePage.open(page).SwitchCustomer('Park Place Technologies LLC').ClickAdminHubBtn().UserSearch(email);

  await expect(user.$userFirstName).toHaveValue('test');
});

test('User Detail Page', async ({ page }) => {
  email = 'testautomation@parkplacetech.com';
  const user = HomePage.open(page).SwitchCustomer('Park Place Technologies LLC').ClickAdminHubBtn().UserSearch(email);

  await expect(user.$status).toHaveValue('ACTIVE');
  await expect(user.$okta).toHaveValue('ACTIVE');
  await expect(user.$phone).toHaveValue('2161111111');
  await expect(user.$address).toHaveValue('5910 Landerbrook Dr #300, Mayfield Heights, OH 44124, USA');

  await user.$tokenTab.click();
  await user.$rolesTab.click();
  await user.$customersTab.click();
  await user.$accountsTab.click();
  await user.$equityTab.click();
  await user.$detailsTab.click();
});
