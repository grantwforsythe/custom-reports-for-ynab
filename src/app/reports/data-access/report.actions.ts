import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CategoryGroup } from '../../shared/services/ynab/interfaces/categories/categoryGroup';
import { Account } from '../../shared/services/ynab/interfaces/accounts/account';
import { Transaction } from '../../shared/services/ynab/interfaces/transactions/transaction';

export const ReportActions = createActionGroup({
  source: 'Report',
  events: {
    'Init': emptyProps(),
    'Set': props<{
      categoryGroups: CategoryGroup[];
      accounts: Account[];
      transactions: Transaction[];
    }>(),
  },
});
