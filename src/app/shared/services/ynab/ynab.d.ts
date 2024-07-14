interface Account {
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
  last_reconciled_at?: string;
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

/**
 * The type of account
 */
type AccountType =
  | 'checking'
  | 'savings'
  | 'cash'
  | 'creditCard'
  | 'lineOfCredit'
  | 'otherAsset'
  | 'otherLiability'
  | 'mortgage'
  | 'autoLoan'
  | 'studentLoan'
  | 'personalLoan'
  | 'medicalDebt'
  | 'otherDebt';

interface Payee {
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

interface PayeeLocation {
  id: string;
  payeeId: string;
  latitude: string;
  longitude: string;
  /**
   *
   * Whether or not the payee location has been deleted.  Deleted payee locations will only be included in delta requests.
   */
  deleted: boolean;
}

interface CurrencyFormat {
  iso_code: string;
  example_format: string;
  decimal_digits: number;
  decimal_separator: string;
  symbol_first: boolean;
  group_separator: string;
  currency_symbol: string;
  display_symbol: boolean;
}

interface DateFormat {
  format: string;
}

interface BudgetSummary {
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
  accounts?: Account[];
}

interface MonthSummary {
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

interface BudgetDetail extends BudgetSummary {
  payees?: Payee[];
  payeeLocations?: PayeeLocation[];
  categoryGroups?: Omit<CategoryGroup[], 'categories'>;
  categories?: Category[];
  months?: MonthSummary[];
  transactions?: TransactionSummary[];
  subtransactions?: SubTransaction[];
  scheduledTransactions?: ScheduledTransactionSummary[];
  scheduledSubTransactions?: ScheduledSubTransaction[];
}

interface CategoryGroup {
  id: string;
  name: string;
  /**
   * Whether or not the category group is hidden
   */
  hidden: boolean;
  /**
   * Whether or not the category group has been deleted. Deleted category groups will only be included in delta requests.
   */
  deleted: boolean;
  categories?: Category[];
}

interface Category {
  id: string;
  category_group_id: string;
  category_group_name?: string;
  name: string;
  /**
   * Whether or not the category is hidden
   */
  hidden: boolean;
  /**
   * DEPRECATED: No longer used.  Value will always be null.
   */
  original_category_group_id?: string;
  note?: string;
  /**
   * Budgeted amount in milliunits format
   */
  budgeted: number;
  /**
   * Activity amount in milliunits format
   */
  activity: number;
  /**
   * Balance in milliunits format
   */
  balance: number;
  /**
   * The type of goal, if the category has a goal (TB='Target Category Balance', TBD='Target Category Balance by Date', MF='Monthly Funding', NEED='Plan Your Spending')
   */
  goal_type?: 'TB' | 'TBD' | 'MF' | 'NEED' | 'DEBT' | 'null';
  /**
   * A day offset modifier for the goal's due date. When goal_cadence is 2 (Weekly), this value specifies which day of the week the goal is due (0 = Sunday, 6 = Saturday). Otherwise, this value specifies which day of the month the goal is due (1 = 1st, 31 = 31st, null = Last day of Month).
   */
  goal_day?: number;
  /**
   * The goal cadence. Value in range 0-14. There are two subsets of these values which behave differently. For values 0, 1, 2, and 13, the goal's due date repeats every goal_cadence * goal_cadence_frequency, where 0 = None, 1 = Monthly, 2 = Weekly, and 13 = Yearly. For example, goal_cadence 1 with goal_cadence_frequency 2 means the goal is due every other month. For values 3-12 and 14, goal_cadence_frequency is ignored and the goal's due date repeats every goal_cadence, where 3 = Every 2 Months, 4 = Every 3 Months, ..., 12 = Every 11 Months, and 14 = Every 2 Years.
   */
  goal_cadence?: number;
  /**
   * The goal cadence frequency. When goal_cadence is 0, 1, 2, or 13, a goal's due date repeats every goal_cadence * goal_cadence_frequency. For example, goal_cadence 1 with goal_cadence_frequency 2 means the goal is due every other month.  When goal_cadence is 3-12 or 14, goal_cadence_frequency is ignored.
   */
  goal_cadence_frequency?: number;
  /**
   * The month a goal was created
   */
  goal_creation_month?: string;
  /**
   * The goal target amount in milliunits
   */
  goal_target?: number;
  /**
   * The original target month for the goal to be completed.  Only some goal types specify this date.
   */
  goal_target_month?: string;
  /**
   * The percentage completion of the goal
   */
  goal_percentage_complete?: number;
  /**
   * The number of months, including the current month, left in the current goal period.
   */
  goal_months_to_budget?: number;
  /**
   * The amount of funding still needed in the current month to stay on track towards completing the goal within the current goal period. This amount will generally correspond to the 'Underfunded' amount in the web and mobile clients except when viewing a category with a Needed for Spending Goal in a future month.  The web and mobile clients will ignore any funding from a prior goal period when viewing category with a Needed for Spending Goal in a future month.
   */
  goal_under_funded?: number;
  /**
   * The total amount funded towards the goal within the current goal period.
   */
  goal_overall_funded?: number;
  /**
   * The amount of funding still needed to complete the goal within the current goal period.
   */
  goal_overall_left?: number;
  /**
   * Whether or not the category has been deleted.  Deleted categories will only be included in delta requests.
   */
  deleted: boolean;
}

interface ScheduledTransactionSummary {
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

interface TransactionSummary {
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
   * If the transaction was imported, this field is a unique (by account)
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

type FlagColor = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'null';
interface SubTransaction {
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
  transfer_transaction_id?: string;
  /**
   * Whether or not the subtransaction has been deleted.  Deleted subtransactions will only be included in delta requests.
   */
  deleted: boolean;
}

interface ScheduledSubTransaction {
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

interface Transaction extends TransactionSummary {
  account_name: string;
  payee_name?: string;
  category_name?: string;
  subtransactions?: SubTransaction[];
}

interface YnabError {
  id: string;
  name: string;
  detail: string;
}
