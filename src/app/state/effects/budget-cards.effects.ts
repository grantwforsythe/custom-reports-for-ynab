import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { of, switchMap, tap } from 'rxjs';

import { YnabService } from '../../shared/services/ynab/ynab.service';
import { budgetActions } from '../actions/budget-cards.actions';

export class BudgetEffects {
  actions$ = inject(Actions);

  ynab = inject(YnabService);

  store = inject(Store);

  router = inject(Router);

  /* eslint-disable arrow-body-style */
  loadBudgets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(budgetActions.initBudgets),
      switchMap(_action => this.ynab.getBudgets()),
      tap((budgets: BudgetSummary[]) => {
        if (budgets.length === 1) {
          this.router.navigate(['budgets', budgets[0].id, 'dashboard']);
        }
      }),
      switchMap((budgets: BudgetSummary[]) => of(budgetActions.setBudgets({ budgets }))),
    );
  });
}
