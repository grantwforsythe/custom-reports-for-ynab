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

export const selectEarliestTransactionDate = createSelector(
  selectReportState,
  ({ transactions }) => {
    const today = new Date();

    if (transactions.length === 0) return today;

    return transactions.reduce((date, transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate < date ? transactionDate : date;
    }, today);
  },
);

/**
 * Selects transactions from the report state, filtering out transactions that
 * that are not within the specified date range:
 *  - If the start and end dates are null, all transactions are returned.
 *  - If the start date is null, only transactions up to the end date are returned.
 *  - If the end date is null, only transactions after the start date are returned.
 *  - Else transactions between the start and end dates are returned.
 *
 * @return {Transaction[]} The filtered transactions.
 */
export const selectFilteredTransactions = createSelector(
  selectReportState,
  selectFormState,
  ({ transactions }, { start, end }) => {
    if (start === null && end === null) {
      return transactions;
    } else if (start === null) {
      return transactions.filter(
        (transaction) => new Date(transaction.date).getTime() <= new Date(end as string).getTime(),
      );
    } else if (end === null) {
      return transactions.filter(
        (transaction) => new Date(transaction.date).getTime() >= new Date(start).getTime(),
      );
    } else {
      return transactions.filter((transaction) => {
        return (
          new Date(transaction.date).getTime() >= new Date(start).getTime() &&
          new Date(transaction.date).getTime() <= new Date(end).getTime()
        );
      });
    }
  },
);

/**
 * Selects transactions from the report state, filtering out deleted transactions and
 * transactions that don't meet the specified criteria.
 *
 * @return {Transaction[]} The filtered transactions.
 */
// TODO: Refactor into separate selector
export const selectReportTransactions = createSelector(
  selectFilteredTransactions,
  selectFormState,
  (filteredTransactions, form) => {
    const transactions = filteredTransactions
      .filter((transaction) => {
        return (
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
      });

    switch (form.sort) {
      case 'asc':
        return transactions.sort((a, b) => a.amount - b.amount);
      case 'desc':
        return transactions.sort((a, b) => b.amount - a.amount);
      default:
        return transactions;
    }
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
