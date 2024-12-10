import { expect, test } from '@fixture';
import { collectTableWithoutHeaders } from 'playwright-table';
import { HomePage } from '@pages/home.page';

test('Filter Columns', async ({ page }) => {
  const colName = ['Serial #', 'Host name', 'Asset Tag', 'OEM', 'Location', 'Contract #'];
  const submitPage = HomePage.open(page).SwitchCustomer('Park Place Technologies LLC').ClickSubmitNewTicketBtn();
  await submitPage.$softwareTicketBtn.click();

  await page.waitForSelector('.k-grid-table');
  const rows = await collectTableWithoutHeaders({
    page,
    selector: '.k-grid-table',
  });
  submitPage.SetFilter(colName[0], { firstOperator: 'Starts with', firstValue: '8TL' });
  await page.waitForTimeout(8000);
  await page.waitForSelector('.k-grid-table');
  const filteredRows = await collectTableWithoutHeaders({
    page,
    selector: '.k-grid-table',
  });
  const largeArrayStrings = Array.isArray(rows) && rows.length > 0 ? rows.map(row => JSON.stringify(row)) : [];
  const smallArrayStrings =
    Array.isArray(filteredRows) && filteredRows.length > 0
      ? filteredRows && filteredRows.map(row => JSON.stringify(row))
      : [];

  expect.soft(smallArrayStrings.every(item => largeArrayStrings.includes(item))).toBeTruthy();
});
