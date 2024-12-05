import { expect, test } from '@fixture';
import { collectTableWithoutHeaders } from 'playwright-table';
import { HomePage } from '@pages/home.page';
import _ from 'underscore';

test.beforeEach(() => {
  const randStr: string = _.random(100, 9999).toString();
});

test('Filter Columns', async ({ page }) => {
  const submit = await HomePage.open(page).SwitchCustomer('Park Place Technologies LLC').ClickSubmitNewTicketBtn();
  await submit.$softwareTicketBtn.click();

  await page.waitForSelector('.k-grid-table');
  const rows = await collectTableWithoutHeaders({
    page,
    selector: '.k-grid-table',
  });
  console.log(rows[0]);
});
