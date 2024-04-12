import { createReducer, on } from '@ngrx/store';

import { Account } from '../../shared/services/ynab/interfaces/accounts/account';
import { CategoryGroup } from '../../shared/services/ynab/interfaces/categories/categoryGroup';
import { Transaction } from '../../shared/services/ynab/interfaces/transactions/transaction';
import { reportActions } from './report.actions';

interface ReportState {
  categoryGroups: CategoryGroup[];
  accounts: Account[];
  transactions: Transaction[];
}

export const initialState: ReportState = {
  categoryGroups: [],
  accounts: [],
  transactions: [],
};

export const reportReducer = createReducer(
  initialState,
  on(reportActions.setReportData, (_state, action): ReportState => {
    return {
      categoryGroups: action.categoryGroups,
      accounts: action.accounts,
      transactions: action.transactions,
    };
  }),
  on(reportActions.resetReportData, (): ReportState => initialState),
);
