import { inject } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { init, set } from './report.actions';
import { forkJoin, mergeMap, of, switchMap } from 'rxjs';
import { YnabService } from '../../shared/services/ynab/ynab.service';
import { Store } from '@ngrx/store';
import { selectRouteNestedParam } from '../../router.selectors';

export class ReportEffects {
  actions$ = inject(Actions);
  ynab = inject(YnabService);
  store = inject(Store);

  loadBudgetResources$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(init),
      concatLatestFrom(() => this.store.select(selectRouteNestedParam('id'))),
      mergeMap(([_action, id]) => {
        return forkJoin({
          categoryGroups: this.ynab.getCategoryGroups(id),
          accounts: this.ynab.getAccounts(id),
          transactions: this.ynab.getTransactions(id),
        });
      }),
      switchMap((data) => {
        return of(set(data));
      }),
    );
  });
}
