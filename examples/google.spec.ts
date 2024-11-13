import { expect, test } from '@fixture';
import { GooglePage } from 'examples/google.page';

test('Sample Test with Chaining', ({ page }) => {
  const inputField = GooglePage.open(page).inputSearch('Park Place').pressEnter().$textareaInput;
  expect(inputField.isVisible()).toBeTruthy();
});
