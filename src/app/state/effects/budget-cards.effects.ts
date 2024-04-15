import { inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { of, switchMap } from 'rxjs';

import { YnabService } from '../../shared/services/ynab/ynab.service';
import { budgetActions } from '../actions/budget-cards.actions';

export class BudgetEffects {
  actions$ = inject(Actions);
  ynab = inject(YnabService);
  store = inject(Store);

  loadBudgets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(budgetActions.initBudgets),
      switchMap((_action) => {
        return this.ynab.getBudgets();
      }),
      switchMap((budgets) => {
        return of(budgetActions.setBudgets({ budgets }));
      }),
    );
  });
}
