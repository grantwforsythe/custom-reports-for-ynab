import { Component, inject } from '@angular/core';
import { YnabService } from '../services/ynab/ynab.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-budgets',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatRippleModule, DatePipe],
  templateUrl: './budgets.component.html',
})
export class BudgetsComponent {
  ynab = inject(YnabService);
  budgets$ = this.ynab.getBudgets();

  constructor() {}
}
