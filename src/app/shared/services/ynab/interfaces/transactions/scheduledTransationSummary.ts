import { FlagColor } from './flagColor';

export interface ScheduledTransactionSummary {
  id: string;
  /**
   * The first date for which the Scheduled Transaction was scheduled.
   */
  date_first: string;
  /**
   * The next date for which the Scheduled Transaction is scheduled.
   */
  date_next: string;
  frequency:
    | 'never'
    | 'daily'
    | 'weekly'
    | 'everyOtherWeek'
    | 'twiceAMonth'
    | 'every4Weeks'
    | 'monthly'
    | 'everyOtherMonth'
    | 'every3Months'
    | 'every4Months'
    | 'twiceAYear'
    | 'yearly'
    | 'everyOtherYear';
  /**
   * The scheduled transaction amount in milliunits format
   */
  amount: number;
  memo?: string;
  flag_color?: FlagColor;
  flag_name?: string;
  account_id: string;
  payee_id?: string;
  category_id?: string;
  /**
   * If a transfer, the account_id which the scheduled transaction transfers to
   */
  transfer_account_id?: string;
  /**
   * Whether or not the scheduled transaction has been deleted.  Deleted scheduled transactions will only be included in delta requests.
   */
  deleted: boolean;
}
