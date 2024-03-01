import { FlagColor } from './flagColor';

export interface TransactionSummary {
  id: string;
  /**
   * The transaction date in ISO format (e.g. 2016-12-01)
   */
  date: string;
  /**
   * The transaction amount in milliunits format
   */
  amount: number;
  memo?: string;
  cleared: 'cleared' | 'uncleared' | 'reconciled';
  /**
   * Whether or not the transaction is approved
   */
  approved: boolean;
  flag_color?: FlagColor;
  flag_name?: string;
  account_id: string;
  payee_id?: string;
  category_id?: string;
  /**
   * If a transfer transaction, the account to which it transfers
   */
  transfer_account_id?: string;
  /**
   * If a transfer transaction, the id of transaction on the other side of the transfer
   */
  transfer_transaction_id?: string;
  /**
   * If transaction is matched, the id of the matched transaction
   */
  matched_transaction_id?: string;
  /**
   * If the transaction was imported, this field is a unique (by account) import identifier.  If this transaction was imported through File Based Import or Direct Import and not through the API, the import_id will have the format: 'YNAB:[milliunit_amount]:[iso_date]:[occurrence]'.  For example, a transaction dated 2015-12-30 in the amount of -$294.23 USD would have an import_id of 'YNAB:-294230:2015-12-30:1'.  If a second transaction on the same account was imported and had the same date and same amount, its import_id would be 'YNAB:-294230:2015-12-30:2'.
   */
  import_id?: string;
  /**
   * If the transaction was imported, the payee name that was used when importing and before applying any payee rename rules
   */
  import_payee_name?: string;
  /**
   * If the transaction was imported, the original payee name as it appeared on the statement
   */
  import_payee_name_original?: string;
  /**
   * If the transaction is a debt/loan account transaction, the type of transaction
   */
  debt_transaction_type?:
    | 'payment'
    | 'refund'
    | 'fee'
    | 'interest'
    | 'escrow'
    | 'balanceAdjustment'
    | 'credit'
    | 'charge'
    | 'null';
  /**
   * Whether or not the transaction has been deleted.  Deleted transactions will only be included in delta requests.
   */
  deleted: boolean;
}
