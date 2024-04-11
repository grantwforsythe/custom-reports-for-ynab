import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { Account } from './interfaces/accounts/account';
import { BudgetDetail } from './interfaces/budgets/detail/budgetDetail';
import { BudgetSummary } from './interfaces/budgets/summary/budgetSummary';
import { CategoryGroup } from './interfaces/categories/categoryGroup';
import { Payee } from './interfaces/payees/payee';
import { Transaction } from './interfaces/transactions/transaction';
import { YnabError } from './interfaces/ynabError';
import { YnabService } from './ynab.service';

const id = '3fa85f64-5717-4562-b3fc-2c963f66afa6';

describe('YnabService', () => {
  let controller: HttpTestingController;
  let service: YnabService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(YnabService);
    controller = TestBed.inject(HttpTestingController);
  }));

  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getBudgets()', () => {
    it('should fetch budgets without accounts', () => {
      const mockBudgets: { data: { budgets: BudgetSummary[]; default_budget?: BudgetSummary } } = {
        data: {
          budgets: [
            {
              id,
              name: 'Walter White’s Budget',
              last_modified_on: '2013-09-29T22:34:46Z',
              first_month: '2013-09-01',
              last_month: '2013-10-01',
              date_format: { 'format': 'MM/DD/YYYY' },
              currency_format: {
                currency_symbol: '$',
                decimal_digits: 2,
                decimal_separator: '.',
                display_symbol: true,
                example_format: '123,456.78',
                group_separator: ',',
                iso_code: 'USD',
                symbol_first: true,
              },
            },
          ],
        },
      };

      service.getBudgets().subscribe((budgets) => {
        expect(budgets).toHaveSize(1);
      });

      const req = controller.expectOne(
        {
          method: 'GET',
          url: 'https://api.ynab.com/v1/budgets?include_accounts=false',
        },
        'Fetch budgets',
      );

      expect(req.cancelled).toBeFalsy();
      expect(req.request.responseType).toEqual('json');

      req.flush(mockBudgets);
    });

    it('should handle error', () => {
      const mockError: YnabError = {
        id: '404',
        name: 'Not found',
        detail: 'No budgets were found',
      };

      service.getBudgets().subscribe({
        complete: () => fail('should have thrown an error'),
        error: (error: YnabError) => {
          expect(error).withContext('error').toEqual(mockError);
        },
      });

      const req = controller.expectOne(
        {
          method: 'GET',
          url: 'https://api.ynab.com/v1/budgets?include_accounts=false',
        },
        'Handle errors when fetching budgets',
      );

      expect(req.cancelled).toBeFalsy();
      expect(req.request.responseType).toEqual('json');

      req.flush(mockError, { status: 404, statusText: 'Not found' });
    });
  });

  describe('#getBudgetById()', () => {
    it('should fetch a budget', () => {
      const mockBudget: { data: { budget: BudgetDetail; server_knowledge: number } } = {
        data: {
          budget: {
            id,
            name: 'Walter White’s Budget',
            last_modified_on: '2013-09-29T22:34:46Z',
            first_month: '2013-09-01',
            last_month: '2013-10-01',
            date_format: { format: 'MM/DD/YYYY' },
            currency_format: {
              iso_code: 'USD',
              example_format: '123,456.78',
              decimal_digits: 2,
              decimal_separator: '.',
              symbol_first: true,
              group_separator: ',',
              currency_symbol: '$',
              display_symbol: true,
            },
          },
          server_knowledge: 0,
        },
      };

      service.getBudgetById(id).subscribe((budget) => {
        expect(budget.id).toEqual(id);
      });

      const req = controller.expectOne(
        {
          method: 'GET',
          url: `https://api.ynab.com/v1/budgets/${id}`,
        },
        'Fetch budget',
      );

      expect(req.cancelled).toBeFalsy();
      expect(req.request.responseType).toBe('json');

      req.flush(mockBudget);
    });

    it('should handle error', () => {
      const mockError: YnabError = {
        id: '404',
        name: 'Not found',
        detail: 'The specified budget was not found',
      };

      service.getBudgetById(id).subscribe({
        complete: () => fail('should have thrown an error'),
        error: (error: YnabError) => {
          expect(error).withContext('error').toEqual(mockError);
        },
      });

      const req = controller.expectOne(
        {
          method: 'GET',
          url: `https://api.ynab.com/v1/budgets/${id}`,
        },
        'Handle errors when fetching a budget',
      );

      expect(req.cancelled).toBeFalsy();
      expect(req.request.responseType).toEqual('json');

      req.flush(mockError, { status: 404, statusText: 'Not found' });
    });
  });

  describe('#getCategoryGroups()', () => {
    it('should fetch category groups', () => {
      const mockCategoryGroups: {
        data: { category_groups: CategoryGroup[]; server_knowledge: number };
      } = {
        data: {
          category_groups: [
            {
              id,
              name: 'string',
              hidden: true,
              deleted: true,
              categories: [
                {
                  id,
                  category_group_id: id,
                  category_group_name: 'string',
                  name: 'string',
                  hidden: true,
                  original_category_group_id: id,
                  note: 'string',
                  budgeted: 0,
                  activity: 0,
                  balance: 0,
                  goal_type: 'TB',
                  goal_day: 0,
                  goal_cadence: 0,
                  goal_cadence_frequency: 0,
                  goal_creation_month: '2024-03-09',
                  goal_target: 0,
                  goal_target_month: '2024-03-09',
                  goal_percentage_complete: 0,
                  goal_months_to_budget: 0,
                  goal_under_funded: 0,
                  goal_overall_funded: 0,
                  goal_overall_left: 0,
                  deleted: true,
                },
              ],
            },
          ],
          'server_knowledge': 0,
        },
      };

      service.getCategoryGroups(id).subscribe((categoryGroups) => {
        expect(categoryGroups).toHaveSize(1);
      });

      const req = controller.expectOne(
        {
          method: 'GET',
          url: `https://api.ynab.com/v1/budgets/${id}/categories`,
        },
        'Fetch all category groups for a budget',
      );

      expect(req.cancelled).toBeFalsy();
      expect(req.request.responseType).toEqual('json');

      req.flush(mockCategoryGroups);
    });

    it('should handle error', () => {
      const mockError: YnabError = {
        id: '403',
        name: 'Unauthorized',
        detail: 'Unauthorized to access this endpoint',
      };

      service.getCategoryGroups(id).subscribe({
        complete: () => fail('should have thrown an error'),
        error: (error: YnabError) => {
          expect(error).withContext('error').toEqual(mockError);
        },
      });

      const req = controller.expectOne(
        {
          method: 'GET',
          url: `https://api.ynab.com/v1/budgets/${id}/categories`,
        },
        'Handle errors when fetching all category groups for a budget',
      );

      expect(req.cancelled).toBeFalsy();
      expect(req.request.responseType).toEqual('json');

      req.flush(mockError, { status: 403, statusText: 'Unauthorized' });
    });
  });

  describe('#getPayees()', () => {
    it('should fetch category groups', () => {
      const mockPayees: { data: { payees: Payee[]; server_knowledge: number } } = {
        data: {
          payees: [
            {
              id,
              name: 'string',
              transfer_account_id: 'string',
              deleted: true,
            },
          ],
          server_knowledge: 0,
        },
      };

      service.getPayees(id).subscribe((payees) => {
        expect(payees).toHaveSize(1);
      });

      const req = controller.expectOne(
        {
          method: 'GET',
          url: `https://api.ynab.com/v1/budgets/${id}/payees`,
        },
        'Fetch all payees for a budget',
      );

      expect(req.cancelled).toBeFalsy();
      expect(req.request.responseType).toEqual('json');

      req.flush(mockPayees);
    });

    it('should handle error', () => {
      const mockError: YnabError = {
        id: '403',
        name: 'Unauthorized',
        detail: 'Unauthorized to access this endpoint',
      };

      service.getPayees(id).subscribe({
        complete: () => fail('should have thrown an error'),
        error: (error: YnabError) => {
          expect(error).withContext('error').toEqual(mockError);
        },
      });

      const req = controller.expectOne(
        {
          method: 'GET',
          url: `https://api.ynab.com/v1/budgets/${id}/payees`,
        },
        'Handle errors when fetching payees',
      );

      expect(req.cancelled).toBeFalsy();
      expect(req.request.responseType).toEqual('json');

      req.flush(mockError, { status: 403, statusText: 'Unauthorized' });
    });
  });

  describe('#getTransactions()', () => {
    it('should fetch transactions', () => {
      const mockTransactions: { data: { transactions: Transaction[]; server_knowledge: number } } =
        {
          data: {
            transactions: [
              {
                id,
                date: '2024-03-09',
                amount: 0,
                memo: 'string',
                cleared: 'cleared',
                approved: true,
                flag_color: 'red',
                flag_name: 'string',
                account_id: id,
                payee_id: id,
                category_id: id,
                transfer_account_id: id,
                transfer_transaction_id: id,
                matched_transaction_id: id,
                import_id: id,
                import_payee_name: 'string',
                import_payee_name_original: 'string',
                debt_transaction_type: 'payment',
                deleted: true,
                account_name: 'string',
                payee_name: 'string',
                category_name: 'string',
                subtransactions: [
                  {
                    id,
                    transaction_id: id,
                    amount: 0,
                    memo: 'string',
                    payee_id: id,
                    payee_name: 'string',
                    category_id: id,
                    category_name: 'string',
                    transfer_account_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                    transfer_transaction_id: id,
                    deleted: true,
                  },
                ],
              },
            ],
            server_knowledge: 0,
          },
        };

      service.getTransactions(id).subscribe((transactions) => {
        expect(transactions).toHaveSize(1);
      });

      const req = controller.expectOne(
        {
          method: 'GET',
          url: `https://api.ynab.com/v1/budgets/${id}/transactions`,
        },
        'Fetch all transactions for a budget',
      );

      expect(req.cancelled).toBeFalsy();
      expect(req.request.responseType).toEqual('json');

      req.flush(mockTransactions);
    });

    it('should handle error', () => {
      const mockError: YnabError = {
        id: '403',
        name: 'Unauthorized',
        detail: 'Unauthorized to access this endpoint',
      };

      service.getTransactions(id).subscribe({
        complete: () => fail('should have thrown an error'),
        error: (error: YnabError) => {
          expect(error).withContext('error').toEqual(mockError);
        },
      });

      const req = controller.expectOne(
        {
          method: 'GET',
          url: `https://api.ynab.com/v1/budgets/${id}/transactions`,
        },
        'Handle errors when fetching all transactions for a budget',
      );

      expect(req.cancelled).toBeFalsy();
      expect(req.request.responseType).toEqual('json');

      req.flush(mockError, { status: 403, statusText: 'Unauthorized' });
    });
  });

  describe('#getAccounts()', () => {
    it('should fetch accounts', () => {
      const mockAccounts: { data: { accounts: Account[]; server_knowledge: number } } = {
        data: {
          accounts: [
            {
              id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
              name: 'string',
              type: 'checking',
              on_budget: true,
              closed: true,
              note: 'string',
              balance: 0,
              cleared_balance: 0,
              uncleared_balance: 0,
              transfer_payee_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
              direct_import_linked: true,
              direct_import_in_error: true,
              last_reconciled_at: '2024-03-14T02:39:28.300Z',
              debt_original_balance: 0,
              debt_interest_rates: {},
              debt_minimum_payments: {},
              debt_escrow_amounts: {},
              deleted: true,
            },
          ],
          server_knowledge: 0,
        },
      };

      service.getAccounts(id).subscribe((transactions) => {
        expect(transactions).toHaveSize(1);
      });

      const req = controller.expectOne(
        {
          method: 'GET',
          url: `https://api.ynab.com/v1/budgets/${id}/accounts`,
        },
        'Fetch all accounts for a budget',
      );

      expect(req.cancelled).toBeFalsy();
      expect(req.request.responseType).toEqual('json');

      req.flush(mockAccounts);
    });

    it('should handle error', () => {
      const mockError: YnabError = {
        id: '403',
        name: 'Unauthorized',
        detail: 'Unauthorized to access this endpoint',
      };

      service.getAccounts(id).subscribe({
        complete: () => fail('should have thrown an error'),
        error: (error: YnabError) => {
          expect(error).withContext('error').toEqual(mockError);
        },
      });

      const req = controller.expectOne(
        {
          method: 'GET',
          url: `https://api.ynab.com/v1/budgets/${id}/accounts`,
        },
        'Handle errors when fetching all accounts for a budget',
      );

      expect(req.cancelled).toBeFalsy();
      expect(req.request.responseType).toEqual('json');

      req.flush(mockError, { status: 403, statusText: 'Unauthorized' });
    });
  });
});
