import { createReducer, on } from '@ngrx/store';
import { budgetActions } from './budget-cards.actions';
import { BudgetSummary } from '../../../shared/services/ynab/interfaces/budgets/summary/budgetSummary';

export interface BudgetState {
  budgets: BudgetSummary[];
}

const initialState: BudgetState = {
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
