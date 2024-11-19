import { Page } from '@playwright/test';
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

  public async ClickAdminHubBtn(): Promise<UserManagerPO> {
    await this._navBar.$adminHubBtn.dblclick({ delay: 600 });
    await this.page.waitForResponse(
      resp => resp.url().includes('/administration-user/get-search-all-users?') && resp.status() === 200,
      { timeout: 30000 },
    );

    const { UserManagerPage } = await import('@pages/admin-hub/user-manager.page');
    return new UserManagerPage(this.page);
  }

  public async SwitchCustomer(customer: string): Promise<UserManagerPO> {
    await this._header.$settingsBtn.click();
    await this._header.$switchCustomerBtn.click();
    await this.page.getByPlaceholder('Select Customer').click();
    await this.page.getByPlaceholder('Customer Name').pressSequentially(customer);
    await this.page.getByLabel('Customer', { exact: true }).getByText(customer, { exact: true }).click();
    await this._header.$changeCustomerBtn.click();
    await this._navBar.$homeBtn.click();
    const { UserManagerPage } = await import('@pages/admin-hub/user-manager.page');
    return new UserManagerPage(this.page);
  }
}
