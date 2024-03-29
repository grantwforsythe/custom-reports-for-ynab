import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoryGroup } from '../../shared/services/ynab/interfaces/categories/categoryGroup';
import { Account } from '../../shared/services/ynab/interfaces/accounts/account';
import { Transaction } from '../../shared/services/ynab/interfaces/transactions/transaction';
import { FormState } from '../feature/dashboard/reports-form/dashboard-form.interface';

export interface ReportState {
  categoryGroups: CategoryGroup[];
  accounts: Account[];
  transactions: Transaction[];
}

export interface AppState {
  form: FormState;
  report: ReportState;
}

export const selectFormState = createFeatureSelector<FormState>('form');

export const selectReportState = createFeatureSelector<ReportState>('report');

/**
 * Selects accounts from the report state, filtering out deleted accounts.
 *
 * @return {Account[]} The filtered accounts.
 */
export const selectReportAccounts = createSelector(selectReportState, (report) => {
  return report.accounts.filter((account) => !account.deleted);
});

/**
 * Selects categories from the report state, filtering out all undefined
 * categories.
 *
 * @return {Category[]} The filtered categories.
 */
export const selectReportCategories = createSelector(selectReportState, (report) => {
  return report.categoryGroups
    .flatMap((categoryGroup) => categoryGroup?.categories)
    .filter((category) => !!category);
});

/**
 * Selects transactions from the report state, filtering out deleted transactions and
 * transactions that don't meet the specified criteria.
 *
 * @return {Transaction[]} The filtered transactions.
 */
export const selectReportTransactions = createSelector(
  selectReportState,
  selectFormState,
  (report, form) => {
    return (
      report.transactions
        .filter((transaction) => {
          return (
            new Date(transaction.date).getFullYear() === 2024 &&
            transaction.amount < 0 &&
            !transaction.deleted &&
            !!transaction.category_id &&
            transaction.subtransactions !== undefined
          );
        })
        // TODO: Refactor into separate selector
        // Filter by select accounts
        .filter((transaction) => {
          if (form.account?.length === 0 || form.account === null) {
            return true;
          }

          return form.account.includes(transaction.account_id);
        })
        // TODO: Refactor into separate selector
        // Filter by select categories
        .filter((transaction) => {
          // If no category is selected, display all transactions with and without a category
          if (form.category?.length === 0 || form.category === null) {
            return true;
          } else if (transaction.category_id === undefined) {
            return false;
          } else {
            return form.category.includes(transaction.category_id);
          }
        })
    );
  },
);

/**
 * An interface representing the results of a report.
 *
 * @property {number} value The transaction amount in units
 * @property {string} name The category name associated with the transaction
 */
export interface ReportResults {
  value: number;
  name: string;
}

/**
 * Selects results from report state.
 *
 * @return {ReportResults[]} The results from report state.
 */
export const selectReportResults = createSelector(
  selectReportCategories,
  selectReportTransactions,
  (categories, transactions) => {
    return transactions.map((transaction) => {
      return {
        value: (transaction.amount / 1000) * -1,
        name:
          // TODO: Fix this
          categories.find((category) => category?.id === transaction.category_id)?.name ?? 'temp',
      };
    });
  },
);
