import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const reportActions = createActionGroup({
  source: 'Dashboard Page',
  events: {
    'Init Report Data': emptyProps(),
    'Set Report Data': props<{
      categoryGroups: CategoryGroup[];
      accounts: Account[];
      transactions: Transaction[];
    }>(),
    'Reset Report Data': emptyProps(),
  },
});
