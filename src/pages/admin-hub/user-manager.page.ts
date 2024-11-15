import { Locator, Page } from '@playwright/test';
import { BasePage } from '@pages/base/base.page';
import { createProxymisedPage } from '@utils/proxymise.utils';

export interface IUserManagerPage extends BasePage {
  CreateUser(firstName: string, lastName: string, userEmail: string): Promise<UserManagerPO>;
  UserSearch(userEmail: string): Promise<UserManagerPO>;
}

interface UserSearchResponse {
  value: Array<{
    email: string;
  }>;
}

export class UserManagerPO extends BasePage implements IUserManagerPage {
  private readonly $createUserBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.$createUserBtn = this.page.locator('li').filter({ hasText: 'Create User' });
  }

  public static async open(page: Page): Promise<UserManagerPO> {
    await page.goto('/admin-hub/user-manager');
    return new UserManagerPO(page);
  }

  public CreateUser = async (firstName: string, lastName: string, userEmail: string): Promise<UserManagerPO> => {
    await this.$createUserBtn.waitFor({ state: 'attached' });
    await this.$createUserBtn.click();
    await this.page.getByPlaceholder('Search for Customer').click();
    await this.page.getByPlaceholder('Search for Customer').fill('Park Place Technologies LLC');
    await this.page.getByRole('option', { name: 'Park Place Technologies LLC', exact: true }).click();
    await this.page.getByPlaceholder('First name').click();
    await this.page.getByPlaceholder('First name').fill(firstName);
    await this.page.getByPlaceholder('Last name').click();
    await this.page.getByPlaceholder('Last name').fill(lastName);
    await this.page.getByPlaceholder('Email address').click();
    await this.page.getByPlaceholder('Email address').fill(userEmail);
    await this.page.getByPlaceholder('Phone').fill('1112223333');
    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.page.getByRole('button', { name: 'Yes, Create' }).click();
    return this;
  };

  public UserSearch = async (userEmail: string): Promise<UserManagerPO> => {
    await this.page.getByRole('button').nth(2).click();
    const [response]: any = await Promise.all([
      this.page.waitForResponse(resp => resp.url().includes('/get-search-all-users?'), { timeout: 30000 }),
      this.page.getByPlaceholder('User Email').click(),
      this.page.getByPlaceholder('User Email').fill(userEmail),
    ]);
    const jsonResponse: UserSearchResponse = await response.json();
    if (jsonResponse.value.length === 0) throw new Error(`User: ${userEmail} not found`);
    const [{ email }] = jsonResponse.value;

    if (email !== userEmail) throw new Error(`User email: ${userEmail} do not match response email: ${email}`);
    await this.page.locator('cdk-virtual-scroll-viewport [tabindex="0"]').click();
    return this;
  };
}

const UserManagerPage = createProxymisedPage<UserManagerPO>(UserManagerPO);
export { UserManagerPage };
