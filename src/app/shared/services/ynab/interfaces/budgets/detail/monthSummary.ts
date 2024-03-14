import { Category } from '../../categories/category';

export interface MonthSummary {
  month: string;
  note?: string;
  /**
   * The total amount of transactions categorized to 'Inflow: Ready to Assign' in the month
   */
  income: number;
  /**
   * The total amount budgeted in the month
   */
  budgeted: number;
  /**
   * The total amount of transactions in the month, excluding those categorized to 'Inflow: Ready to Assign'
   */
  activity: number;
  /**
   * The available amount for 'Ready to Assign'
   */
  to_be_budgeted: number;
  /**
   * The Age of Money as of the month
   */
  age_of_money?: number;
  /**
   * Whether or not the month has been deleted.  Deleted months will only be included in delta requests.
   */
  deleted: boolean;
  /**
   * The budget month categories.  Amounts (budgeted, activity, balance, etc.) are specific to the {month} parameter specified.
   */
  categories: Category[];
}
