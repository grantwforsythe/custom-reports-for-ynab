import { Component, OnDestroy, inject } from '@angular/core';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { YnabService } from '../services/ynab/ynab.service';

@Component({
  selector: 'app-budget-details',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './budget-details.component.html',
})
export class BudgetDetailsComponent implements OnDestroy {
  ynab = inject(YnabService);
  route = inject(ActivatedRoute);

  private destroy$ = new Subject<void>();

  budget$ = this.route.params.pipe(
    takeUntil(this.destroy$),
    switchMap((params) => this.ynab.getBudgetById(params['id'])),
  );

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
