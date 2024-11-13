import { Locator, Page } from '@playwright/test';

class NavBarComponent {
  protected readonly page: Page;
  readonly $adminHubBtn: Locator;
  readonly $userManagerBtn: Locator;
  readonly $assetDropBtn: Locator;
  readonly $assetHubBtn: Locator;
  readonly $homeBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.$adminHubBtn = this.page.locator('span', { hasText: 'Admin Hub' });
    this.$userManagerBtn = this.page.locator('span', { hasText: 'User Manager' });
    this.$assetHubBtn = this.page.locator('[aria-label="Asset Hub"]');
    this.$assetDropBtn = this.page.getByText('Asset Drop', { exact: true });
    this.$homeBtn = this.page.locator('div').filter({ hasText: 'Home' }).nth(2);
  }
}

export { NavBarComponent };
