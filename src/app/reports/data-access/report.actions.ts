import { createAction, props } from '@ngrx/store';
import { CategoryGroup } from '../../shared/services/ynab/interfaces/categories/categoryGroup';
import { Account } from '../../shared/services/ynab/interfaces/accounts/account';
import { Transaction } from '../../shared/services/ynab/interfaces/transactions/transaction';

export const init = createAction('[Report] Init');

export const set = createAction(
  '[Report] Set',
  props<{ categoryGroups: CategoryGroup[]; accounts: Account[]; transactions: Transaction[] }>(),
);
