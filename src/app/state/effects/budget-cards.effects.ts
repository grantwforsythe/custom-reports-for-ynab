import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { of, switchMap, tap } from 'rxjs';

import { BudgetSummary } from '../../shared/services/ynab/interfaces/budgets/summary/budgetSummary';
import { YnabService } from '../../shared/services/ynab/ynab.service';
import { budgetActions } from '../actions/budget-cards.actions';

export class BudgetEffects {
  actions$ = inject(Actions);
  ynab = inject(YnabService);
  store = inject(Store);
  router = inject(Router);

  loadBudgets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(budgetActions.initBudgets),
      switchMap((_action) => {
        return this.ynab.getBudgets();
      }),
      tap((budgets: BudgetSummary[]) => {
        if (budgets.length === 1) {
          this.router.navigate(['budgets', budgets[0].id, 'dashboard']);
        }
      }),
      switchMap((budgets: BudgetSummary[]) => {
        return of(budgetActions.setBudgets({ budgets }));
      }),
    );
  });
}
