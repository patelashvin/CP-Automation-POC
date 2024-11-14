import { Locator, Page } from '@playwright/test';
import { UserDetailPage } from '@pages/user-detail.page';
import { BasePage } from '@pages/base/base.page';
import { createProxymisedPage } from '@utils/proxymise.utils';

export class UserManagerPO extends BasePage {
  private readonly $createUserBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.$createUserBtn = this.page.locator('li').filter({ hasText: 'Create User' });
  }

  public async open(page: Page): Promise<IPageObject> {
    await page.goto('/admin-hub/user-manager');
    return new UserManagerPO(page) as unknown as IPageObject;
  }

  public CreateUser = async (firstName: string, lastName: string, userEmail: string): Promise<IPageObject> => {
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
    return this as unknown as IPageObject;
  };

  public UserSearch = async (userEmail: string): Promise<IPageObject> => {
    await this.page.getByRole('button').nth(2).click();
    const [response]: any = await Promise.all([
      this.page.waitForResponse(resp => resp.url().includes('/get-search-all-users?'), { timeout: 30000 }),
      this.page.getByPlaceholder('User Email').click(),
      this.page.getByPlaceholder('User Email').fill(userEmail),
    ]);
    const jsonResponse: object = await response.json();
    if (jsonResponse['value'].length === 0) throw new Error(`User: ${userEmail} not found`);
    const [{ email }] = jsonResponse['value'];

    if (email !== userEmail) throw new Error(`User email: ${userEmail} do not match response email: ${email}`);
    await this.page.locator('cdk-virtual-scroll-viewport [tabindex="0"]').click();
    return this as unknown as IPageObject;
  };
}

const UserManagerPage = createProxymisedPage(UserManagerPO);
export { UserManagerPage };
