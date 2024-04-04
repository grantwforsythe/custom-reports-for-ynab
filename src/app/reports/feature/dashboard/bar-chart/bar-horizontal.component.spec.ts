import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ChartsBarHorizontalComponent } from './bar-horizontal.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CategoryGroup } from '../../../../shared/services/ynab/interfaces/categories/categoryGroup';
import { Account } from '../../../../shared/services/ynab/interfaces/accounts/account';
import { Transaction } from '../../../../shared/services/ynab/interfaces/transactions/transaction';
import { selectReportResults } from '../../../data-access/report.selectors';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('ChartsBarHorizontalComponent', () => {
  let component: ChartsBarHorizontalComponent;
  let fixture: ComponentFixture<ChartsBarHorizontalComponent>;
  let store: MockStore;

  const initialState: {
    categoryGroups: CategoryGroup[];
    accounts: Account[];
    transactions: Transaction[];
  } = {
    categoryGroups: [],
    accounts: [],
    transactions: [],
  };

  afterEach(() => {
    store?.resetSelectors();
  });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        NgxChartsModule,
        provideAnimationsAsync(),
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: selectReportResults,
              value: [
                {
                  name: 'Groceries',
                  value: 100,
                },
                {
                  name: 'Pet Care',
                  value: 25,
                },
                {
                  name: 'Internet',
                  value: 50,
                },
              ],
            },
          ],
        }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsBarHorizontalComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should call populate chart on #ngOnInit()', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const legend: HTMLElement = fixture.nativeElement.querySelector('ul.legend-labels');
    expect(legend.textContent).toContain('Groceries');
    expect(legend.textContent).toContain('Pet Care');
    expect(legend.textContent).toContain('Internet');
  });
});
