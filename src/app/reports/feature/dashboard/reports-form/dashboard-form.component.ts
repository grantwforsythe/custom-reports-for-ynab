import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  selectReportAccounts,
  selectReportCategories,
} from '../../../data-access/report.selectors';
import { combineLatest, Observable, startWith, Subject, takeUntil } from 'rxjs';
import { Category } from '../../../../shared/services/ynab/interfaces/categories/category';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AsyncPipe } from '@angular/common';
import { Account } from '../../../../shared/services/ynab/interfaces/accounts/account';
import { formActions } from './dashboard-form.actions';
import { FormState } from './dashboard-form.interface';

@Component({
  selector: 'app-reports-dashboard-form',
  standalone: true,
  templateUrl: './dashboard-form.component.html',
  styleUrl: './dashboard-form.component.scss',
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
})
export class DashboardFormComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private destroy$ = new Subject<void>();

  // dateRange = new FormGroup({
  //   start: new FormControl<Date | null>(new Date()),
  //   end: new FormControl<Date | null>(new Date()),
  // });
  sort = new FormControl<'desc' | 'asc' | undefined>(undefined);
  category = new FormControl<string[]>([]);
  account = new FormControl<string[]>([]);

  categories$!: Observable<(Category | undefined)[]>;
  accounts$!: Observable<Account[]>;

  ngOnInit(): void {
    this.categories$ = this.store.select(selectReportCategories);
    this.accounts$ = this.store.select(selectReportAccounts);

    combineLatest([
      this.sort.valueChanges.pipe(startWith(this.sort.value)),
      this.category.valueChanges.pipe(startWith(this.category.value)),
      this.account.valueChanges.pipe(startWith(this.account.value)),
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([sort, category, account]) => {
        this.updateFormState({
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
