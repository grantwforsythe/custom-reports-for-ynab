import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EMPTY, Observable, catchError, map, tap, throwError } from 'rxjs';
import { BudgetSummary } from './interfaces/budgets/summary/budgetSummary';
import { BudgetSummaryResponseData } from './interfaces/budgets/summary/budgetSummaryResponseData';

@Injectable({
  providedIn: 'root',
})
export class YnabService {
  http = inject(HttpClient);

  constructor() {}

  // TODO: Add error handling
  getBudgets(includeAccounts: boolean = true): Observable<BudgetSummary[]> {
    return this.http
      .get<{ data: BudgetSummaryResponseData }>('https://api.ynab.com/v1/budgets', {
        params: { 'include_accounts': includeAccounts },
      })
      .pipe(
        tap((event) => console.log('error:', event)),
        map(({ data }) => data.budgets),
        catchError((error) => {
          console.log(error);
          throwError(() => error);
          return EMPTY;
        }),
      );
  }
}
