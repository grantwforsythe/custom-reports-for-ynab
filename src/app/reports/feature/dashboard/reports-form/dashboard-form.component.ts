import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  selectReportAccounts,
  selectReportCategories,
} from '../../../data-access/report.selectors';
import { Observable } from 'rxjs';
import { Category } from '../../../../shared/services/ynab/interfaces/categories/category';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AsyncPipe } from '@angular/common';
import { Account } from '../../../../shared/services/ynab/interfaces/accounts/account';

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
export class DashboardFormComponent implements OnInit {
  store = inject(Store);

  dashboardForm!: FormGroup;

  categories$!: Observable<(Category | undefined)[]>;
  accounts$!: Observable<Account[]>;

  ngOnInit(): void {
    this.dashboardForm = new FormGroup({
      sort: new FormControl('desc'),
      category: new FormControl([]),
      account: new FormControl([]),
    });

    this.categories$ = this.store.select(selectReportCategories);
    this.accounts$ = this.store.select(selectReportAccounts);
  }
}
