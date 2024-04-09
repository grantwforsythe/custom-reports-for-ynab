import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { budgetActions } from './budget-cards.actions';
import { selectBudgets } from './budget-cards.selectors';

@Component({
  selector: 'app-budgets',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatRippleModule, DatePipe, RouterModule],
  templateUrl: './budget-cards.component.html',
  styleUrl: './budget-cards.component.scss',
})
export class BudgetCardsComponent implements OnInit {
  private store = inject(Store);
  budgets$ = this.store.select(selectBudgets);

  ngOnInit(): void {
    this.store.dispatch(budgetActions.initBudgets());
  }
}
