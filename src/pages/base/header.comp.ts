import { Locator, Page } from '@playwright/test';

class HeaderComponent {
  protected readonly page: Page;
  readonly $settingsBtn: Locator;
  readonly $switchCustomerBtn: Locator;
  readonly $customerNameInput: Locator;
  readonly $changeCustomerBtn: Locator;
  readonly $selectCustomerInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.$settingsBtn = this.page.locator('#changeAccount');
    this.$switchCustomerBtn = this.page.getByText('Switch Customer');
    this.$customerNameInput = this.page.getByPlaceholder('Customer Name');
    this.$changeCustomerBtn = this.page.getByRole('button', { name: 'Change Customer' });
    this.$selectCustomerInput = this.page.locator('[aria-label="Select Customer"]');
  }
}

export { HeaderComponent };
