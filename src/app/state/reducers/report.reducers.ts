import { createReducer, on } from '@ngrx/store';

import { reportActions } from '../actions/report.actions';
import { ReportState } from '../app.state';

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
