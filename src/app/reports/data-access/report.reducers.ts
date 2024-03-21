import { createReducer, on } from '@ngrx/store';
import { ReportActions } from './report.actions';
import { CategoryGroup } from '../../shared/services/ynab/interfaces/categories/categoryGroup';
import { Account } from '../../shared/services/ynab/interfaces/accounts/account';
import { Transaction } from '../../shared/services/ynab/interfaces/transactions/transaction';

interface ReportState {
  categoryGroups: CategoryGroup[];
  accounts: Account[];
  transactions: Transaction[];
}

const initialState: ReportState = {
  categoryGroups: [],
  accounts: [],
  transactions: [],
};

export const reportReducer = createReducer(
  initialState,
  on(ReportActions.setReportData, (state, action): ReportState => {
    return {
      ...state,
      categoryGroups: action.categoryGroups,
      accounts: action.accounts,
      transactions: action.transactions,
    };
  }),
);
