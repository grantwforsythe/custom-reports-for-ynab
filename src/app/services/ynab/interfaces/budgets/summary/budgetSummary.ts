import { Account } from '../../accounts/account';
import { CurrencyFormat } from './currencyFormat';
import { DateFormat } from './dateFormat';

export interface BudgetSummary {
  id: string;
  name: string;
  /**
   * The last time any changes were made to the budget from either a web or mobile client
   */
  last_modified_on?: string;
  /**
   * The earliest budget month
   */
  first_month?: string;
  /**
   * The latest budget month
   */
  last_month?: string;
  date_format?: DateFormat;
  currency_format?: CurrencyFormat;
  /**
   * The budget accounts (only included if `include_accounts=true` specified as query parameter)
   */
  accounts?: Array<Account>;
}
