import { TestBed } from '@angular/core/testing';

import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

import { Observable, of } from 'rxjs';

import { YnabService } from '../../shared/services/ynab/ynab.service';
import {
  mockAccounts,
  mockCategoryGroups,
  mockId,
  mockTransactions,
} from '../../shared/utils/mocks';
import { reportActions } from '../actions/report.actions';
import { ReportEffects } from './report.effects';

describe('ReportEffects', () => {
  let actions$: Observable<Action>;
  let effects: ReportEffects;
  let ynabSpy: jasmine.SpyObj<YnabService>;

  const initialState = {
    router: {
      state: {
        root: {
          params: {},
          data: {},
          url: [],
          outlet: 'primary',
          routeConfig: null,
          queryParams: {},
          fragment: null,
          firstChild: {
            params: {
              id: mockId,
            },
            data: {},
            url: [
              {
                path: 'budgets',
                parameters: {},
              },
              {
                path: mockId,
                parameters: {},
              },
              {
                path: 'dashboard',
                parameters: {},
              },
            ],
            outlet: 'primary',
            routeConfig: {
              path: 'budgets/:id/dashboard',
            },
            queryParams: {},
            fragment: null,
            children: [],
          },
          children: [
            {
              params: {
                mockId: mockId,
              },
              data: {},
              url: [
                {
                  path: 'budgets',
                  parameters: {},
                },
                {
                  path: mockId,
                  parameters: {},
                },
                {
                  path: 'dashboard',
                  parameters: {},
                },
              ],
              outlet: 'primary',
              routeConfig: {
                path: 'budgets/:id/dashboard',
              },
              queryParams: {},
              fragment: null,
              children: [],
            },
          ],
        },
        url: `/budgets/${mockId}/dashboard`,
      },
      navigationId: 3,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ReportEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
        {
          provide: YnabService,
          useValue: jasmine.createSpyObj('YnabService', [
            'getCategoryGroups',
            'getAccounts',
            'getTransactions',
          ]),
        },
      ],
    });

    actions$ = TestBed.inject(Actions);
    effects = TestBed.inject(ReportEffects);
    ynabSpy = TestBed.inject(YnabService) as jasmine.SpyObj<YnabService>;
  });

  describe('loadBudgetResources$', () => {
    // TODO: Test for invalid ID
    it('should dispatch setReportData when initReportData is dispatched', () => {
      actions$ = of({ type: '[Dashboard Page] Init Report Data' });
      ynabSpy.getCategoryGroups.and.returnValue(of(mockCategoryGroups));
      ynabSpy.getAccounts.and.returnValue(of(mockAccounts));
      ynabSpy.getTransactions.and.returnValue(of(mockTransactions));

      effects.loadBudgetResources$.subscribe((action) => {
        expect(action).toEqual(
          reportActions.setReportData({
            accounts: mockAccounts,
            categoryGroups: mockCategoryGroups,
            transactions: mockTransactions,
          }),
        );
      });

      expect(ynabSpy.getCategoryGroups).toHaveBeenCalledWith(mockId);
      expect(ynabSpy.getAccounts).toHaveBeenCalledWith(mockId);
      expect(ynabSpy.getTransactions).toHaveBeenCalledWith(mockId);
    });
  });
});
