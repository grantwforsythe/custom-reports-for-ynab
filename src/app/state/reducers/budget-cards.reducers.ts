import { createReducer, on } from '@ngrx/store';

import { budgetActions } from '../actions/budget-cards.actions';
import { BudgetState } from '../app.state';

export const initialState: BudgetState = {
  budgets: [],
};

export const budgetsReducers = createReducer(
  initialState,
  on(budgetActions.setBudgets, (_state, action): BudgetState => {
    return {
      budgets: action.budgets,
    };
  }),
);
