import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { BudgetSummary } from '../../shared/services/ynab/interfaces/budgets/summary/budgetSummary';

export const budgetActions = createActionGroup({
  source: 'Budget Page',
  events: {
    'Init Budgets': emptyProps(),
    'Set Budgets': props<{
      budgets: BudgetSummary[];
    }>(),
  },
});
