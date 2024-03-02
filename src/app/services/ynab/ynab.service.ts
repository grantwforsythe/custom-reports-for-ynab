import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { BudgetSummary } from './interfaces/budgets/summary/budgetSummary';
import { BudgetDetail } from './interfaces/budgets/detail/budgetDetail';

@Injectable({
  providedIn: 'root',
})
export class YnabService {
  http = inject(HttpClient);

  constructor() {}

  // TODO: Improve error handling
  private handleError(error: HttpErrorResponse) {
    return throwError(() => {
      console.log(error);
      return error.error;
    });
  }

  getBudgets(includeAccounts: boolean = false): Observable<BudgetSummary[]> {
    return this.http
      .get<{ data: { budgets: BudgetSummary[]; default_budget?: BudgetSummary } }>(
        'https://api.ynab.com/v1/budgets',
        {
          params: { include_accounts: includeAccounts },
        },
      )
      .pipe(
        map(({ data }) => data.budgets),
        catchError(this.handleError),
      );
  }

  getBudgetById(budgetId: string): Observable<BudgetDetail> {
    return this.http
      .get<{
        data: { budget: BudgetDetail; server_knowledge: number };
      }>(`https://api.ynab.com/v1/budgets/${budgetId}`)
      .pipe(
        map(({ data }) => data.budget),
        catchError(this.handleError),
      );
  }
}
