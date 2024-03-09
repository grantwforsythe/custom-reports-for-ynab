import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

import { BudgetDetail } from './interfaces/budgets/detail/budgetDetail';
import { BudgetSummary } from './interfaces/budgets/summary/budgetSummary';
import { PayeeLocation } from './interfaces/payees/payeeLocation';
import { Transaction } from './interfaces/transactions/transaction';
import { CategoryGroup } from './interfaces/categories/categoryGroup';

const BASE_URL = 'https://api.ynab.com/v1';

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
        `${BASE_URL}/budgets`,
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
      }>(`${BASE_URL}/budgets/${budgetId}`)
      .pipe(
        map(({ data }) => data.budget),
        catchError(this.handleError),
      );
  }

  getCategories(budgetId: string) {
    return this.http
      .get<{
        data: { categories: CategoryGroup[]; server_knowledge: number };
      }>(`${BASE_URL}/budgets/${budgetId}/categories`)
      .pipe(
        map(({ data }) => data.categories),
        catchError(this.handleError),
      );
  }

  getPayees(budgetId: string): Observable<PayeeLocation[]> {
    return this.http
      .get<{
        data: { payees: PayeeLocation[]; server_knowledge: number };
      }>(`${BASE_URL}/budgets/${budgetId}/payees`)
      .pipe(
        map(({ data }) => data.payees),
        catchError(this.handleError),
      );
  }

  getTransactions(budgetId: string): Observable<Transaction[]> {
    return this.http
      .get<{
        data: { transactions: Transaction[]; server_knowledge: number };
      }>(`${BASE_URL}/budgets/${budgetId}/transactions`)
      .pipe(
        map(({ data }) => data.transactions),
        catchError(this.handleError),
      );
  }
}
