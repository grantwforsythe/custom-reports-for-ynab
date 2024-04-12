import { mockAccounts, mockCategoryGroups, mockTransactions } from '../../shared/utils/mocks';
import { reportActions } from './report.actions';
import * as fromReducer from './report.reducers';

describe('Report Reducer', () => {
  describe('an unknown action', () => {
    it('should return the initial state', () => {
      const action = { type: 'Unknown' };
      const result = fromReducer.reportReducer(fromReducer.initialState, action);

      expect(result).toBe(fromReducer.initialState);
    });
  });

  describe('#setReportData()', () => {
    it('should set the state with the provided categories, accounts, and transactions', () => {
      const action = reportActions.setReportData({
        categoryGroups: mockCategoryGroups,
        accounts: mockAccounts,
        transactions: mockTransactions,
      });

      const result = fromReducer.reportReducer(fromReducer.initialState, action);

      expect(result.categoryGroups).toEqual(mockCategoryGroups);
      expect(result.accounts).toEqual(mockAccounts);
      expect(result.transactions).toEqual(mockTransactions);
    });
  });

  describe('#resetReportData()', () => {
    it('should return the initial state', () => {
      const action = reportActions.resetReportData();

      const result = fromReducer.reportReducer(fromReducer.initialState, action);

      expect(result).toEqual(fromReducer.initialState);
    });
  });
});
