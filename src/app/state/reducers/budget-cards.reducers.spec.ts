import { budgetActions } from '../actions/budget-cards.actions';
import * as fromReducer from './budget-cards.reducers';

describe('Budget Cards Reducers', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.budgetsReducers(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('#setBudgets()', () => {
    it('should set the budget cards', () => {
      const action = budgetActions.setBudgets({
        budgets: [{ id: '1', name: 'Test Budget 1' }],
      });
      const result = fromReducer.budgetsReducers(fromReducer.initialState, action);
      expect(result.budgets).toEqual([{ id: '1', name: 'Test Budget 1' }]);
    });
  });
});
