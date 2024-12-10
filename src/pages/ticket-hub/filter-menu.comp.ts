import { Locator, Page } from '@playwright/test';

export type FilterOperator =
  | 'Is equal to'
  | 'Is not equal to'
  | 'Contains'
  | 'Does not contain'
  | 'Starts with'
  | 'Ends with'
  | 'Is null'
  | 'Is not null'
  | 'Is empty'
  | 'Is not empty';

export interface FilterOptions {
  firstValue?: string;
  firstOperator?: FilterOperator;
  logicalOperator?: 'And' | 'Or';
  secondValue?: string;
  secondOperator?: FilterOperator;
}

class FilterMenuComponent {
  public readonly page: Page;
  public readonly $filterContainer: Locator;
  public readonly $filterInputs: Locator;
  public readonly $operatorDropdowns: Locator;
  public readonly $logicalOperator: Locator;
  public readonly $filterButton: Locator;
  public readonly $clearButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.$filterContainer = page.locator('.k-filter-menu-container');
    this.$filterInputs = this.$filterContainer.locator('input.k-textbox');
    this.$operatorDropdowns = this.$filterContainer.locator('kendo-dropdownlist:not(.k-filter-and)');
    this.$logicalOperator = this.$filterContainer.locator('.k-filter-and');
    this.$filterButton = this.$filterContainer.locator('button.k-primary');
    this.$clearButton = this.$filterContainer.locator('button:text("Clear")');
  }

  public async changeFilterOperator(position: 1 | 2, operator: FilterOperator) {
    const $dropdown = position === 1 ? this.$operatorDropdowns.first() : this.$operatorDropdowns.last();

    await $dropdown.click();

    // Convert operator text to dropdown item identifier
    const operatorId = this.getOperatorId(operator);
    await this.page.locator(`li[id$="-${operatorId}"]`).click();
  }

  /**
   * Converts operator text to dropdown item identifier
   */
  public getOperatorId(operator: FilterOperator): string {
    const operatorMap: Record<FilterOperator, string> = {
      'Is equal to': 'eq',
      'Is not equal to': 'neq',
      Contains: 'contains',
      'Does not contain': 'doesnotcontain',
      'Starts with': 'startswith',
      'Ends with': 'endswith',
      'Is null': 'isnull',
      'Is not null': 'isnotnull',
      'Is empty': 'isempty',
      'Is not empty': 'isnotempty',
    };
    return operatorMap[operator];
  }
}

export { FilterMenuComponent };
