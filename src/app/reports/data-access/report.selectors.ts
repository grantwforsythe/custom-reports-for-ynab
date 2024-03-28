import { createSelector } from '@ngrx/store';
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
    transactions: state.report.transactions
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
        if (state.form.account?.length === 0 || state.form.account === null) {
          return true;
        }

        return state.form.account.includes(transaction.account_id);
      })
      // TODO: Refactor into separate selector
      // Filter by select categories
      .filter((transaction) => {
        // If no category is selected, display all transactions with and without a category
        if (state.form.category?.length === 0 || state.form.category === null) {
          return true;
        } else if (transaction.category_id === undefined) {
          return false;
        } else {
          return state.form.category.includes(transaction.category_id);
        }
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
