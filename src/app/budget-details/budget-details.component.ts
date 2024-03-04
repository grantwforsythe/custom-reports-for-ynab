import { Component, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { YnabService } from '../services/ynab/ynab.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-budget-details',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './budget-details.component.html',
})
export class BudgetDetailsComponent implements OnDestroy {
  ynab = inject(YnabService);
  route = inject(ActivatedRoute);
  isLoaded = true;

  private destroy$ = new Subject<void>();

  budget$ = this.route.params.pipe(
    takeUntil(this.destroy$),
    switchMap((params) =>
      this.ynab.getBudgetById(params['id']).pipe(tap(() => (this.isLoaded = true))),
    ),
  );

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
