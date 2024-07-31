import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { Store } from '@ngrx/store';

import { Observable, Subject, combineLatest, startWith, takeUntil } from 'rxjs';

import { formActions } from '../../../../state/actions/dashboard-form.actions';
import { FormState } from '../../../../state/app.state';
import {
  selectEarliestTransactionDate,
  selectReportAccounts,
  selectReportCategories,
} from '../../../../state/selectors/report.selectors';

@Component({
  selector: 'app-reports-dashboard-form',
  standalone: true,
  templateUrl: './dashboard-form.component.html',
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatButtonModule,
    AsyncPipe,
  ],
})
export class DashboardFormComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private destroy$ = new Subject<void>();

  // TODO: Create enums
  chartTypeGroups: { name: string; chartTypes: { value: string; name: string }[] }[] = [
    {
      name: 'Bar Charts',
      chartTypes: [
        {
          value: 'vertical',
          name: 'Vertical Bar Chart',
        },
        {
          value: 'horizontal',
          name: 'horizontal Bar Chart',
        },
      ],
    },
    {
      name: 'Pie Charts',
      chartTypes: [{ value: 'pie-chart', name: 'Pie Chart' }],
    },
    {
      name: 'Other Charts',
      chartTypes: [
        { value: 'tree-map', name: 'Tree Map' },
        { value: 'number-cards', name: 'Number Cards' },
        { value: 'gauge', name: 'Gauge' },
      ],
    },
  ];

  range = new FormGroup({
    start: new FormControl<string | undefined>(undefined),
    end: new FormControl<string | undefined>(undefined),
  });
  sort = new FormControl<'desc' | 'asc' | undefined>(undefined);
  category = new FormControl<string[]>([]);
  account = new FormControl<string[]>([]);
  chartType = new FormControl<string>('vertical');

  categories$!: Observable<(Category | undefined)[]>;
  accounts$!: Observable<Account[]>;

  minDate$!: Observable<Date>;
  maxDate: Date = new Date();

  ngOnInit(): void {
    this.categories$ = this.store.select(selectReportCategories);
    this.accounts$ = this.store.select(selectReportAccounts);
    this.minDate$ = this.store.select(selectEarliestTransactionDate);

    // Select all the accounts by default
    this.accounts$.pipe(takeUntil(this.destroy$)).subscribe(accounts => {
      this.account.setValue(accounts.map(account => account.id));
    });

    // Select all the categories by default
    this.categories$.pipe(takeUntil(this.destroy$)).subscribe(categories => {
      this.category.setValue(categories.map(category => category!.id));
    });

    // TODO: Think about refactoring this into individual subscriptions
    combineLatest([
      this.chartType.valueChanges.pipe(startWith('vertical')),
      this.range.get('start')!.valueChanges.pipe(startWith(undefined)),
      this.range.get('end')!.valueChanges.pipe(startWith(undefined)),
      this.sort.valueChanges.pipe(startWith(undefined)),
      this.category.valueChanges.pipe(startWith(this.category.value)),
      this.account.valueChanges.pipe(startWith(this.account.value)),
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([chartType, start, end, sort, category, account]) => {
        this.updateFormState({
          chartType,
          start,
          end,
          sort,
          category,
          account,
        });
      });
  }

  private updateFormState(form: Partial<FormState>) {
    this.store.dispatch(
      formActions.setFormData({
        form,
      }),
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
