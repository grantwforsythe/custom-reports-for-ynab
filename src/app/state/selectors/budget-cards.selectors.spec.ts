import { BudgetState } from '../app.state';
import { selectBudgets } from './budget-cards.selectors';

describe('Budget Cards Selectors', () => {
  describe('selectBudgets', () => {
    it('should select budgets sorted by last_modified_on', () => {
      const initialState: BudgetState = {
        budgets: [
          {
            id: '1',
            name: 'Test Budget 1',
            last_modified_on: '2022-01-01',
          },
          {
            id: '2',
            name: 'Test Budget 2',
            last_modified_on: '2022-02-01',
          },
        ],
      };
      const result = selectBudgets.projector(initialState);

      expect(result).toHaveSize(2);
      expect(result).toEqual([
        {
          id: '2',
          name: 'Test Budget 2',
          last_modified_on: new Date('2022-02-01'),
        },
        {
          id: '1',
          name: 'Test Budget 1',
          last_modified_on: new Date('2022-01-01'),
        },
      ]);
    });

    it('should handle undefined last_modified_on', () => {
      const initialState: BudgetState = {
        budgets: [
          {
            id: '1',
            name: 'Test Budget 1',
          },
          {
            id: '2',
            name: 'Test Budget 2',
            last_modified_on: '2022-02-01',
          },
        ],
      };
      const result = selectBudgets.projector(initialState);

      expect(result).toHaveSize(2);
      expect(result).toEqual([
        {
          id: '2',
          name: 'Test Budget 2',
          last_modified_on: new Date('2022-02-01'),
        },
        {
          id: '1',
          name: 'Test Budget 1',
          last_modified_on: null,
        },
      ]);
    });
  });
});
