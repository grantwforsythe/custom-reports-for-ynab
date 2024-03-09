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
  // TODO: Handle split transactions
  // TODO: Add ability for user to sort ascending or descending

  budget$ = this.route.params.pipe(
    takeUntil(this.destroy$),
    switchMap((params) => this.ynab.getBudgetById(params['id'])),
    map((budget: BudgetDetail) => {
      const ignoredTransactionIds =
        budget.subtransactions?.map((subtransaction) => subtransaction.transaction_id) ?? [];

      return (
        budget.transactions
          /**
           * Filter out transactions based on the following criteria:
           *  - Not made during the month of February
           *  - An inflow
           *  - Deleted
           *  - Doesn't have a category_id
           *  - Isn't a split transaction
           **/
          ?.filter((transaction) => {
            return (
              new Date(transaction.date).getMonth() === 2 &&
              transaction.amount < 0 &&
              !transaction.deleted &&
              !!transaction.category_id &&
              !ignoredTransactionIds.includes(transaction.id)
            );
          })
          .map((transaction) => {
            return {
              value: (transaction.amount / 1000) * -1,
              name:
                budget.categories?.find((category) => category.id === transaction.category_id)
                  ?.name ?? transaction.category_id,
            };
          })
          // Descending order
          .sort((t1, t2) => t2.value - t1.value)
      );
    }),
  );

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
