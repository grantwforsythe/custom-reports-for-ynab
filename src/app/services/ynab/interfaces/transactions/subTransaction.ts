export interface SubTransaction {
  id: string;
  transaction_id: string;
  /**
   * The subtransaction amount in milliunits format
   */
  amount: number;
  memo?: string;
  payee_id?: string;
  payee_name?: string;
  category_id?: string;
  category_name?: string;
  /**
   * If a transfer, the account_id which the subtransaction transfers to
   */
  transfer_account_id?: string;
  /**
   * If a transfer, the id of transaction on the other side of the transfer
   */
  transfer_transaction_Id?: string;
  /**
   * Whether or not the subtransaction has been deleted.  Deleted subtransactions will only be included in delta requests.
   */
  deleted: boolean;
}
