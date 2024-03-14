export interface Payee {
  id: string;
  name: string;
  /**
   * If a transfer payee, the 'account_id' to which this payee transfer to
   */
  transfer_account_id?: string;
  /**
   * Whether or not the payee has been deleted. Deleted payees will only be included in delta requests.
   */
  deleted: boolean;
}
