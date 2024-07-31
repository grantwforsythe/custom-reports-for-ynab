import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

import { Observable, of } from 'rxjs';

import { YnabService } from '../../shared/services/ynab/ynab.service';
import { mockBudgets } from '../../shared/utils/mocks';
import { budgetActions } from '../actions/budget-cards.actions';
import { BudgetEffects } from './budget-cards.effects';

describe('BudgetEffects', () => {
  let actions$: Observable<Action>;
  let effects: BudgetEffects;
  let ynabSpy: jasmine.SpyObj<YnabService>;
  let router: jasmine.SpyObj<Router>;

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
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate']),
        },
      ],
    });

    actions$ = TestBed.inject(Actions);
    effects = TestBed.inject(BudgetEffects);
    ynabSpy = TestBed.inject(YnabService) as jasmine.SpyObj<YnabService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  describe('loadBudgets$', () => {
    it('should dispatch setBudgets when initBudgets is dispatched and not redirect if there are multiple budgets', () => {
      actions$ = of({ type: '[Budget Page] Init Budgets' });
      ynabSpy.getBudgets.and.returnValue(of(mockBudgets));

      effects.loadBudgets$.subscribe(action => {
        expect(action.budgets).toEqual(mockBudgets);
        expect(action).toEqual(budgetActions.setBudgets({ budgets: mockBudgets }));
      });

      expect(ynabSpy.getBudgets).toHaveBeenCalled();
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should dispatch setBudgets when initBudgets is dispatched and redirect to dashboard if there is only one budget', () => {
      const mockBudget = [mockBudgets[0]];
      actions$ = of({ type: '[Budget Page] Init Budgets' });
      ynabSpy.getBudgets.and.returnValue(of(mockBudget));

      effects.loadBudgets$.subscribe(action => {
        expect(action.budgets).toEqual(mockBudget);
        expect(action).toEqual(budgetActions.setBudgets({ budgets: mockBudget }));
      });

      expect(ynabSpy.getBudgets).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['budgets', mockBudgets[0].id, 'dashboard']);
    });
  });
});
