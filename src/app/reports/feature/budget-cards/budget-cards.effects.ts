import { inject } from '@angular/core';
import { budgetActions } from './budget-cards.actions';
import { of, switchMap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { YnabService } from '../../../shared/services/ynab/ynab.service';
import { Store } from '@ngrx/store';

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
