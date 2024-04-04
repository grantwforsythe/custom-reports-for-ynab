import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CategoryGroup } from '../../shared/services/ynab/interfaces/categories/categoryGroup';
import { Account } from '../../shared/services/ynab/interfaces/accounts/account';
import { Transaction } from '../../shared/services/ynab/interfaces/transactions/transaction';

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
