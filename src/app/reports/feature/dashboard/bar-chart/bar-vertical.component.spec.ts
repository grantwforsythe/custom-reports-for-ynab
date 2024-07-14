import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { selectSortedResults } from '../../../../state/selectors/report.selectors';
import { ChartsBarVerticalComponent } from './bar-vertical.component';

describe('ChartsBarVerticalComponent', () => {
  let component: ChartsBarVerticalComponent;
  let fixture: ComponentFixture<ChartsBarVerticalComponent>;
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
              selector: selectSortedResults,
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
    fixture = TestBed.createComponent(ChartsBarVerticalComponent);
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
