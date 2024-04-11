import { createReducer, on } from '@ngrx/store';

import { BudgetSummary } from '../../../shared/services/ynab/interfaces/budgets/summary/budgetSummary';
import { budgetActions } from './budget-cards.actions';

export interface BudgetState {
  budgets: BudgetSummary[];
}

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
