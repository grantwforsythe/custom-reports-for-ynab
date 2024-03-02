import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { YnabService } from '../services/ynab/ynab.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-budget-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './budget-details.component.html',
})
export class BudgetDetailsComponent implements OnInit, OnDestroy {
  ynab = inject(YnabService);
  route = inject(ActivatedRoute);

  private destroy$ = new Subject<void>();

  budget$: Observable<unknown> | undefined;

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.budget$ = this.ynab.getBudgetById(params['id']);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
