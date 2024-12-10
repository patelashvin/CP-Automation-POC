import { Locator, Page } from '@playwright/test';
import { createProxymisedPage } from '@utils/proxymise.utils';
import { BasePage } from '@pages/base/base.page';
import { FilterMenuComponent, FilterOperator, FilterOptions } from '@pages/ticket-hub/filter-menu.comp';

export interface ISubmitPage extends BasePage {
  SetFilter(colName: string, options: FilterOptions): Promise<SubmitPO>;
}

export class SubmitPO extends BasePage {
  public readonly $softwareTicketBtn: Locator;
  private filter: FilterMenuComponent;

  constructor(page: Page) {
    super(page);
    this.$softwareTicketBtn = this.page.getByRole('button', { name: ' Software Ticket' });
    this.filter = new FilterMenuComponent(page);
  }

  public static async open(page: Page): Promise<SubmitPO> {
    await page.goto('/ticket-hub/submit');
    await page.waitForLoadState('domcontentloaded');
    return new SubmitPO(page);
  }

  public async SetFilter(column: string, options: FilterOptions = {}): Promise<SubmitPO> {
    const {
      firstValue,
      firstOperator = 'Contains',
      logicalOperator,
      secondValue,
      secondOperator = 'Contains',
    } = options;

    const _isNullOrEmptyOperator = (operator: FilterOperator): boolean => {
      return ['Is null', 'Is not null', 'Is empty', 'Is not empty'].includes(operator);
    };

    await this.page
      .locator(`//*[text()="${column}"]/ancestor-or-self::span/following-sibling::kendo-grid-filter-menu`)
      .click();
    await this.filter.$filterContainer.waitFor({ state: 'visible' });

    await this.filter.changeFilterOperator(1, firstOperator);

    if (!_isNullOrEmptyOperator(firstOperator) && firstValue !== undefined) {
      await this.filter.$filterInputs.first().fill(firstValue);
    }

    if (logicalOperator && (secondValue !== undefined || _isNullOrEmptyOperator(secondOperator))) {
      await this.filter.$logicalOperator.click();
      await this.page.locator(`[aria-activedescendant$="-${logicalOperator.toLowerCase()}"]`).click();

      await this.filter.changeFilterOperator(2, secondOperator);

      if (!_isNullOrEmptyOperator(secondOperator) && secondValue !== undefined) {
        await this.filter.$filterInputs.last().fill(secondValue);
      }
    }

    await this.filter.$filterButton.waitFor({ state: 'visible' });
    await this.filter.$filterButton.click();
    return new SubmitPO(this.page);
  }
}

const SubmitPage = createProxymisedPage<SubmitPO>(SubmitPO);
export { SubmitPage };
