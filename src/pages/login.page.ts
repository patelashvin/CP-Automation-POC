import { Locator, Page } from '@playwright/test';
import { createProxymisedPage } from '@utils/proxymise.utils';
import { HomePage } from '@pages/home.page';
import { BasePage } from '@pages/base.page';

class LoginPO extends BasePage {
  private readonly $loginButton: Locator;
  private readonly $userNameField: Locator;
  private readonly $nextButton: Locator;
  private readonly $passwordField: Locator;
  private readonly $submitButton: Locator;
  private readonly $nameField: Locator;

  constructor(page: Page) {
    super(page);
    this.$loginButton = this.page.locator('button:has-text("Login")');
    this.$userNameField = this.page.locator('input[name="username"]');
    this.$nextButton = this.page.locator('form [value="Next"]');
    this.$passwordField = this.page.locator('#okta-signin-password');
    this.$submitButton = this.page.locator('#form65 [type="submit"]');
    this.$nameField = this.page.locator('input[name="username"]');
  }

  public static async open(page: Page, url: string | undefined): Promise<LoginPO> {
    await page.goto(url as string);
    await page.waitForLoadState('domcontentloaded');
    return new LoginPO(page);
  }

  async ClickLoginBtn(): Promise<this> {
    await this.$loginButton.waitFor({ state: 'visible' });
    await this.$loginButton.click();
    return this;
  }

  async EnterUserName(username: string | undefined): Promise<this> {
    await this.$userNameField.fill(username as string);
    await this.$nextButton.click();
    return this;
  }

  async EnterPassword(password: string | undefined): Promise<any> {
    await this.$passwordField.fill(password as string);
    await this.$submitButton.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForURL('**/dashboard');
    return new HomePage(this.page);
  }
}

const LoginPage = createProxymisedPage(LoginPO);
export { LoginPage };
