import { Component } from '@angular/core';
import { BudgetDetailsComponent } from '../../../budget-details/budget-details.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true,
  imports: [BudgetDetailsComponent],
})
export class DashboardComponent {}
