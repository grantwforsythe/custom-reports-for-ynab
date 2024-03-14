import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, shareReplay, throwError } from 'rxjs';

import { BudgetDetail } from './interfaces/budgets/detail/budgetDetail';
import { BudgetSummary } from './interfaces/budgets/summary/budgetSummary';
import { Transaction } from './interfaces/transactions/transaction';
import { CategoryGroup } from './interfaces/categories/categoryGroup';
import { Payee } from './interfaces/payees/payee';
import { Account } from './interfaces/accounts/account';

const BASE_URL = 'https://api.ynab.com/v1';

// TODO: Refactor in library

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
        shareReplay(),
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
        shareReplay(),
      );
  }

  getCategoryGroups(budgetId: string) {
    return this.http
      .get<{
        data: { category_groups: CategoryGroup[]; server_knowledge: number };
      }>(`${BASE_URL}/budgets/${budgetId}/categories`)
      .pipe(
        map(({ data }) => data.category_groups),
        catchError(this.handleError),
        shareReplay(),
      );
  }

  getPayees(budgetId: string): Observable<Payee[]> {
    return this.http
      .get<{
        data: { payees: Payee[]; server_knowledge: number };
      }>(`${BASE_URL}/budgets/${budgetId}/payees`)
      .pipe(
        map(({ data }) => data.payees),
        catchError(this.handleError),
        shareReplay(),
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
        shareReplay(),
      );
  }

  getAccounts(budgetId: string): Observable<Account[]> {
    return this.http
      .get<{
        data: { accounts: Account[]; server_knowledge: number };
      }>(`${BASE_URL}/budgets/${budgetId}/accounts`)
      .pipe(
        map(({ data }) => data.accounts),
        catchError(this.handleError),
        shareReplay(),
      );
  }
}
