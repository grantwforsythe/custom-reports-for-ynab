import { Component, OnDestroy, inject } from '@angular/core';
import { Subject, map, switchMap, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { YnabService } from '../services/ynab/ynab.service';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BudgetDetail } from '../services/ynab/interfaces/budgets/detail/budgetDetail';

@Component({
  selector: 'app-budget-details',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatButtonModule, NgxChartsModule],
  templateUrl: './budget-details.component.html',
})
export class BudgetDetailsComponent implements OnDestroy {
  ynab = inject(YnabService);
  route = inject(ActivatedRoute);

  private destroy$ = new Subject<void>();

  // TODO: Add date filters
  // TODO: Add account filters
  // TODO: Add category filters

  budget$ = this.route.params.pipe(
    takeUntil(this.destroy$),
    switchMap((params) => this.ynab.getBudgetById(params['id'])),
    map((budget: BudgetDetail) => {
      return budget.transactions
        ?.filter((transaction) => {
          return new Date(transaction.date).getMonth() === 2 && transaction.amount < 0;
        })
        .map((transaction) => {
          return {
            value: transaction.amount / 1000,
            name: budget.categories?.find((category) => category.id === transaction.category_id)
              ?.name,
          };
        });
    }),
  );

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
