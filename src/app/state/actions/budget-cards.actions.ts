import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const budgetActions = createActionGroup({
  source: 'Budget Page',
  events: {
    'Init Budgets': emptyProps(),
    'Set Budgets': props<{
      budgets: BudgetSummary[];
    }>(),
  },
});
