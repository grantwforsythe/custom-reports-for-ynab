import { TestBed } from '@angular/core/testing';

import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

import { Observable, of } from 'rxjs';

import { BudgetSummary } from '../../../shared/services/ynab/interfaces/budgets/summary/budgetSummary';
import { YnabService } from '../../../shared/services/ynab/ynab.service';
import { budgetActions } from './budget-cards.actions';
import { BudgetEffects } from './budget-cards.effects';

describe('BudgetEffects', () => {
  let actions$: Observable<Action>;
  let effects: BudgetEffects;
  let ynabSpy: jasmine.SpyObj<YnabService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BudgetEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        {
          provide: YnabService,
          useValue: jasmine.createSpyObj('YnabService', ['getBudgets']),
        },
      ],
    });

    actions$ = TestBed.inject(Actions);
    effects = TestBed.inject(BudgetEffects);
    ynabSpy = TestBed.inject(YnabService) as jasmine.SpyObj<YnabService>;
  });

  describe('loadBudgets$', () => {
    it('should dispatch setBudgets when initBudgets is dispatched', () => {
      const mockBudgets: BudgetSummary[] = [
        {
          id: '1',
          name: 'Test Budget 1',
          last_modified_on: '2022-01-01',
        },
        {
          id: '2',
          name: 'Test Budget 2',
          last_modified_on: '2022-02-01',
        },
      ];
      actions$ = of({ type: '[Budget Page] Init Budgets' });
      ynabSpy.getBudgets.and.returnValue(of(mockBudgets));

      effects.loadBudgets$.subscribe((action) => {
        expect(action.budgets).toEqual(mockBudgets);
        expect(action).toEqual(budgetActions.setBudgets({ budgets: mockBudgets }));
      });

      expect(ynabSpy.getBudgets).toHaveBeenCalled();
    });
  });
});
