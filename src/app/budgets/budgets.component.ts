import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { YnabService } from '../services/ynab/ynab.service';

@Component({
  selector: 'app-budgets',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatRippleModule, DatePipe, RouterModule],
  templateUrl: './budgets.component.html',
  styleUrl: './budgets.component.scss',
})
export class BudgetsComponent {
  ynab = inject(YnabService);
  budgets$ = this.ynab.getBudgets();

  constructor() {}
}
