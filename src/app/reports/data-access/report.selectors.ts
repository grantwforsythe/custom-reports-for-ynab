import { createSelector } from '@ngrx/store';
import { CategoryGroup } from '../../shared/services/ynab/interfaces/categories/categoryGroup';
import { Account } from '../../shared/services/ynab/interfaces/accounts/account';
import { Transaction } from '../../shared/services/ynab/interfaces/transactions/transaction';

export interface ReportState {
  categoryGroups: CategoryGroup[];
  accounts: Account[];
  transactions: Transaction[];
}

export interface AppState {
  report: ReportState;
}

export const selectReportAccounts = (state: AppState) => {
  return state.report.accounts.filter((account) => !account.deleted);
};

export const selectReportCategories = (state: AppState) => {
  return state.report.categoryGroups
    .flatMap((categoryGroup) => categoryGroup?.categories)
    .filter((category) => category !== undefined);
};

export const selectReportTransactions = (state: AppState) => {
  return {
    categoryGroups: state.report.categoryGroups,
    transactions: state.report.transactions.filter((transaction) => {
      return (
        new Date(transaction.date).getFullYear() === 2024 &&
        transaction.amount < 0 &&
        !transaction.deleted &&
        !!transaction.category_id &&
        transaction.subtransactions !== undefined
      );
    }),
  };
};

export const selectReportResults = createSelector(
  selectReportTransactions,
  ({ categoryGroups, transactions }) => {
    const categories = categoryGroups.flatMap((categoryGroup) => categoryGroup.categories);

    return transactions.map((transaction) => {
      return {
        value: (transaction.amount / 1000) * -1,
        name:
          categories.find((category) => category?.id === transaction.category_id)?.name ?? 'temp',
      };
    });
  },
);
