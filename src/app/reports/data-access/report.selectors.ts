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

export const selectChartType = createSelector(selectFormState, (form) => form.chartType);

/**
 * Selects accounts from the report state, filtering out deleted accounts.
 *
 * @return {Account[]} The filtered accounts.
 */
export const selectReportAccounts = createSelector(selectReportState, (report) => {
  return report.accounts.filter((account) => !account.deleted && account.on_budget);
});

/**
 * Selects categories from the report state, filtering out all undefined
 * categories.
 *
 * @return {Category[]} The filtered categories.
 */
export const selectReportCategories = createSelector(selectReportState, (report) => {
  return report.categoryGroups
    .filter((categoryGroup) => categoryGroup.name !== 'Internal Master Category')
    .flatMap((categoryGroup) => categoryGroup?.categories)
    .filter((category) => !!category);
});

export const selectEarliestTransactionDate = createSelector(
  selectReportState,
  ({ transactions }) => {
    const today = new Date();

    if (transactions.length === 0) return today;

    // Find the earliest transaction date in the array of transactions.
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
    return (
      filteredTransactions
        // Filter out transactions without a category
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
          if (form.account === null) return true;

          return form.account.includes(transaction.account_id);
        })
        // TODO: Refactor into separate selector
        // Filter by select categories
        .filter((transaction) => {
          if (form.category === null || transaction.category_id === undefined) return true;

          return form.category.includes(transaction.category_id);
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
 * Selects sorted results from report state.
 *
 * @return {ReportResults[]} The sorted results from report state.
 */
export const selectReportResults = createSelector(
  selectReportTransactions,
  selectFormState,
  (transactions, form) => {
    const results = transactions
      // TODO: Refactor
      .filter(
        (transaction) =>
          transaction.category_name !== undefined &&
          transaction.category_name !== 'Inflow: Ready to Assign' &&
          // TODO: Handle split transactions
          transaction.category_name !== 'Split',
      )
      .reduce((results, transaction) => {
        const existingResult = results.find((result) => result.name === transaction.category_name);
        const amount = (transaction.amount / 1000) * -1;

        if (existingResult) {
          existingResult.value += amount;
        } else {
          results.push({
            value: amount,
            name: transaction.category_name!,
          });
        }

        return results;
      }, [] as ReportResults[]);

    // TODO: Refactor into own selector
    switch (form.sort) {
      case 'asc':
        return results.sort((a, b) => a.value - b.value);
      case 'desc':
        return results.sort((a, b) => b.value - a.value);
      default:
        return results;
    }
  },
);
