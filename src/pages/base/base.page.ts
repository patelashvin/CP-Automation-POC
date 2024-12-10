/* eslint-disable @typescript-eslint/no-require-imports */
import { Page } from '@playwright/test';
import { HeaderComponent } from './header.comp';
import { NavBarComponent } from './nav-bar.comp';
import { UserManagerPO } from '@pages/admin-hub/user-manager.page';
import { SubmitPO } from '@pages/ticket-hub/submit.page';

declare global {
  interface IPageObject {
    ClickAdminHubBtn(): Promise<UserManagerPO>;
    SwitchCustomer(customer: string): Promise<UserManagerPO>;
    ClickSubmitNewTicketBtn(): Promise<SubmitPO>;
  }
}

export abstract class BasePage implements IPageObject {
  protected readonly page: Page;
  public readonly Header: HeaderComponent;
  public readonly NavBar: NavBarComponent;

  constructor(page: Page) {
    this.page = page;
    this.Header = new HeaderComponent(page);
    this.NavBar = new NavBarComponent(page);
  }

  public async ClickAdminHubBtn(): Promise<UserManagerPO> {
    await this.NavBar.$adminHubBtn.dblclick({ delay: 600 });
    await this.page.waitForResponse(
      resp => resp.url().includes('/administration-user/get-search-all-users?') && resp.status() === 200,
      { timeout: 30000 },
    );
    const { UserManagerPO } = require('../admin-hub/user-manager.page');
    return new UserManagerPO(this.page);
  }

  public async SwitchCustomer(customer: string): Promise<UserManagerPO> {
    await this.Header.$settingsBtn.click();
    await this.Header.$switchCustomerBtn.click();
    await this.page.getByPlaceholder('Select Customer').click();
    await this.page.getByPlaceholder('Customer Name').pressSequentially(customer);
    await this.page.getByLabel('Customer', { exact: true }).getByText(customer, { exact: true }).click();
    await this.Header.$changeCustomerBtn.click();
    await this.NavBar.$homeBtn.click();
    const { UserManagerPO } = require('../admin-hub/user-manager.page');
    return new UserManagerPO(this.page);
  }

  public async ClickSubmitNewTicketBtn(): Promise<SubmitPO> {
    await this.NavBar.$ticketHubBtn.click({ delay: 600 });
    await this.NavBar.$submitNewTicketBtn.click({ delay: 600 });

    const { SubmitPO } = require('../ticket-hub/submit.page');
    return new SubmitPO(this.page);
  }
}
