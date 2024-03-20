import { createReducer, on } from '@ngrx/store';
import { set } from './report.actions';
import { CategoryGroup } from '../../shared/services/ynab/interfaces/categories/categoryGroup';
import { Account } from '../../shared/services/ynab/interfaces/accounts/account';
import { Transaction } from '../../shared/services/ynab/interfaces/transactions/transaction';

const initialState: {
  categoryGroups: CategoryGroup[];
  accounts: Account[];
  transactions: Transaction[];
} = {
  categoryGroups: [],
  accounts: [],
  transactions: [],
};

export const reportReducer = createReducer(
  initialState,
  on(set, (state, action) => {
    return {
      ...state,
      categoryGroups: action.categoryGroups,
      accounts: action.accounts,
      transactions: action.transactions,
    };
  }),
);
