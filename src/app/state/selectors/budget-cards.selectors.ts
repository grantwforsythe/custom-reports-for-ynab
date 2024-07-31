import { createFeatureSelector, createSelector } from '@ngrx/store';

import { BudgetState } from '../app.state';

export const selectBudgetState = createFeatureSelector<BudgetState>('budget');

export const selectBudgets = createSelector(selectBudgetState, state => {
  return state.budgets
    .map(budget => ({
      ...budget,
      last_modified_on: budget.last_modified_on ? new Date(budget.last_modified_on) : null,
    }))
    .sort(
      (a, b) =>
        (b.last_modified_on || new Date(0)).getTime() -
        (a.last_modified_on || new Date(0)).getTime(),
    );
});
