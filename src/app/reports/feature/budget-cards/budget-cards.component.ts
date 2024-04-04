import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { YnabService } from '../../../shared/services/ynab/ynab.service';

@Component({
  selector: 'app-budgets',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatRippleModule, DatePipe, RouterModule],
  templateUrl: './budget-cards.component.html',
  styleUrl: './budget-cards.component.scss',
})
export class BudgetCardsComponent {
  // TODO: Refactor to use NgRx effect
  ynab = inject(YnabService);
  budgets$ = this.ynab.getBudgets();

  constructor() {}
}
