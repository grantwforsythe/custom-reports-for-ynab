import { TestBed } from '@angular/core/testing';

import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

import { Observable, of } from 'rxjs';

import { YnabService } from '../../../shared/services/ynab/ynab.service';
import { mockBudgets } from '../../../shared/utils/mocks';
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
