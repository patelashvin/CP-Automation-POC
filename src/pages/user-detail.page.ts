import { Locator, Page } from '@playwright/test';
import { UserManagerPage } from '@pages/admin-hub/user-manager.page';
import { createProxymisedPage } from '@utils/proxymise.utils';

export class UserDetailPO {
  protected page: Page;
  readonly $deleteBtn: Locator;
  readonly $userFirstName: Locator;
  readonly $edit: Locator;
  readonly $status: Locator;
  readonly $okta: Locator;
  readonly $userLastName: Locator;
  readonly $phone: Locator;
  readonly $address: Locator;
  readonly $tokenTab: Locator;
  readonly $rolesTab: Locator;
  readonly $customersTab: Locator;
  readonly $accountsTab: Locator;
  readonly $equityTab: Locator;
  readonly $detailsTab: Locator;

  constructor(page: Page) {
    this.page = page;
    this.$deleteBtn = this.page.getByRole('button', { name: 'Delete' });
    this.$userFirstName = this.page.locator('input[type="email"]');
    this.$edit = this.page.getByText('Edit ');
    this.$status = this.page.getByText('Status', { exact: true });
    this.$okta = this.page.getByText('Okta Status');
    this.$userLastName = this.page.getByText('Last Name');
    this.$phone = this.page.getByText('Phone');
    this.$address = this.page.getByText('Full Address');
    this.$tokenTab = this.page.locator('a', { hasText: 'Tokens' });
    this.$rolesTab = this.page.locator('a', { hasText: 'Roles' });
    this.$customersTab = this.page.locator('a', { hasText: 'Customers' });
    this.$accountsTab = this.page.locator('a', { hasText: 'Accounts & Contracts' });
    this.$equityTab = this.page.locator('a', { hasText: 'Entuity' });
    this.$detailsTab = this.page.locator('a', { hasText: 'Details' });
  }

  public static async open(page: Page, customerId: string): Promise<UserDetailPO> {
    await page.goto(`/admin-hub/user-manager/details/${customerId}`);
    return new UserDetailPO(page);
  }

  public DeleteUser = async (): Promise<UserManagerPage> => {
    await this.$deleteBtn.waitFor({ state: 'visible' });
    await this.$deleteBtn.click();
    await this.page.getByRole('button', { name: "Yes, I'm sure" }).click();
    return new UserManagerPage(this.page);
  };
}

const UserDetailPage = createProxymisedPage(UserDetailPO);
export { UserDetailPage };