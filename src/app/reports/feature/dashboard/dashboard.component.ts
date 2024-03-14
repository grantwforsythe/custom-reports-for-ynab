import { Component, inject } from '@angular/core';
import { ChartsBarVerticalComponent } from '../charts/bar-vertical/bar-vertical.component';
import { YnabService } from '../../../shared/services/ynab/ynab.service';
import { ActivatedRoute } from '@angular/router';
import { map, shareReplay, switchMap } from 'rxjs';
import { BudgetDetail } from '../../../shared/services/ynab/interfaces/budgets/detail/budgetDetail';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true,
  imports: [ChartsBarVerticalComponent],
})
export class DashboardComponent {
  ynab = inject(YnabService);
  route = inject(ActivatedRoute);

  results$ = this.route.params.pipe(
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
                  ?.name ?? 'invalid',
            };
          })
          // Descending order
          .sort((t1, t2) => t2.value - t1.value)
      );
    }),
    shareReplay(),
  );
}
