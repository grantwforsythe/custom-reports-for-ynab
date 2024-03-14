export interface Category {
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
