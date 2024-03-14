export interface ScheduledSubTransaction {
  id: string;
  scheduled_transaction_id: string;
  /**
   * The scheduled subtransaction amount in milliunits format
   */
  amount: number;
  memo?: string;
  payee_id?: string;
  category_id?: string;
  /**
   * If a transfer, the account_id which the scheduled subtransaction transfers to
   */
  transfer_account_id?: string;
  /**
   * Whether or not the scheduled subtransaction has been deleted. Deleted scheduled subtransactions will only be included in delta requests.
   */
  deleted: boolean;
}
