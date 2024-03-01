import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { YnabService } from './ynab.service';
import { YnabError } from './interfaces/ynabError';
import { BudgetDetailResponse } from './interfaces/budgets/detail/budgetDetailResponseData';
import { BudgetSummaryResponseData } from './interfaces/budgets/summary/budgetSummaryResponseData';

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
      const mockBudgets: { data: BudgetSummaryResponseData } = {
        data: {
          budgets: [
            {
              id: 'f7ebaf33-92c7-452e-ad67-a870f4944af2',
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
        'Fetch budgets',
      );

      expect(req.cancelled).toBeFalsy();
      expect(req.request.responseType).toEqual('json');

      req.flush(mockError, { status: 404, statusText: 'Not found' });
    });
  });

  describe('#getBudgetById()', () => {
    it('should fetch a budget', () => {
      const id = 'f7ebaf33-92c7-452e-ad67-a870f4944af2';
      const mockBudget: { data: BudgetDetailResponse } = {
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

      const req = controller.expectOne({
        method: 'GET',
        url: `https://api.ynab.com/v1/budgets/${id}`,
      });

      expect(req.cancelled).toBeFalsy();
      expect(req.request.responseType).toBe('json');

      req.flush(mockBudget);
    });

    it('should handle error', () => {
      const id = 'f7ebaf33-92c7-452e-ad67-a870f4944af2';
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
        'Fetch budgets',
      );

      expect(req.cancelled).toBeFalsy();
      expect(req.request.responseType).toEqual('json');

      req.flush(mockError, { status: 404, statusText: 'Not found' });
    });
  });
});
