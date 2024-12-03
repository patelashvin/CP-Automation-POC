import { Locator, Page } from '@playwright/test';
import { createProxymisedPage } from '@utils/proxymise.utils';
import { BasePage } from './base/base.page';

export interface IUserDetailPage extends BasePage {
  DeleteUser(): Promise<UserDetailPO>;
}
export class UserDetailPO extends BasePage implements IUserDetailPage {
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
    super(page);
    this.$deleteBtn = this.page.getByRole('button', { name: 'Delete' });
    this.$userFirstName = this.page.locator('#firstName');
    this.$edit = this.page.getByText('Edit ');
    this.$status = this.page.locator('#statusCode');
    this.$okta = this.page.locator('#oktaStatusCode');
    this.$userLastName = this.page.locator('#lastName');
    this.$phone = this.page.locator('#phone');
    this.$address = this.page.locator('#formattedAddress');
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

  public DeleteUser = async (): Promise<UserDetailPO> => {
    await this.$deleteBtn.waitFor({ state: 'visible' });
    await this.$deleteBtn.click();
    await this.page.getByRole('button', { name: "Yes, I'm sure" }).click();
    return this;
  };
}

const UserDetailPage = createProxymisedPage<UserDetailPO>(UserDetailPO);
export { UserDetailPage };
