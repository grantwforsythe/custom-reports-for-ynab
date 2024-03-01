import { AccountType } from './accountType';

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  /**
   * Whether this account is on budget or not
   */
  on_budget: boolean;
  /**
   * Whether this account is closed or not
   */
  closed: boolean;
  note?: string;
  /**
   * The current balance of the account in milliunits format
   */
  balance: number;
  /**
   * The current cleared balance of the account in milliunits format
   */
  cleared_balance: number;
  /**
   * The current uncleared balance of the account in milliunits format
   */
  uncleared_balance: number;
  /**
   * The payee id which should be used when transferring to this account
   */
  transfer_payee_id: string;
  /**
   * Whether or not the account is linked to a financial institution for automatic transaction import.
   */
  direct_import_linked?: boolean;
  /**
   * If an account linked to a financial institution (direct_import_linked=true) and the linked connection is not in a healthy state, this will be true.
   */
  direct_import_in_error?: boolean;
  /**
   * A date/time specifying when the account was last reconciled.
   */
  last_reconciled_at?: Date;
  /**
   * The original debt/loan account balance, specified in milliunits format.
   */
  debt_original_balance?: number;
  debt_interest_rates?: {
    [key: string]: number | null;
  };
  debt_minimum_payments?: {
    [key: string]: number | null;
  };
  debt_escrow_amounts?: {
    [key: string]: number | null;
  };
  /**
   * Whether or not the account has been deleted.  Deleted accounts will only be included in delta requests.
   */
  deleted: boolean;
}
