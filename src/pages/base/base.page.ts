import { type Page } from '@playwright/test';
import { HeaderComponent } from './header.comp';
import { NavBarComponent } from './nav-bar.comp';
import { UserManagerPO } from '@pages/admin-hub/user-manager.page';

export abstract class BasePage {
  protected readonly page: Page;
  private readonly _header: HeaderComponent;
  private readonly _navBar: NavBarComponent;

  constructor(page: Page) {
    this.page = page;
    this._header = new HeaderComponent(page);
    this._navBar = new NavBarComponent(page);
  }

  get header(): HeaderComponent {
    return this._header;
  }

  get navBar(): NavBarComponent {
    return this._navBar;
  }

  public async ClickAdminHubBtn(): Promise<this> {
    await this.navBar.$adminHubBtn.dblclick({ delay: 600 }).then(async () => {
      await this.page.waitForResponse(
        resp => resp.url().includes('/administration-user/get-search-all-users?') && resp.status() === 200,
        { timeout: 30000 },
      );
    });
    return this;
  }

  public async SwitchCustomer(customer: string): Promise<this> {
    await this.header.$settingsBtn.click();
    await this.header.$switchCustomerBtn.click();
    await this.page.getByPlaceholder('Select Customer').click();
    await this.page.getByPlaceholder('Customer Name').pressSequentially(customer);
    await this.page.getByLabel('Customer', { exact: true }).getByText(customer, { exact: true }).click();
    // await this.page.pause();
    // await this.page.getByText(customer).click();
    await this.header.$changeCustomerBtn.click();
    await this.navBar.$homeBtn.click();
    return this;
  }
}
