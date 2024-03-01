import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { YnabService } from '../services/ynab/ynab.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-budget-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './budget-details.component.html',
})
export class BudgetDetailsComponent implements OnInit {
  ynab = inject(YnabService);
  route = inject(ActivatedRoute);

  budget$: Observable<unknown> | undefined;

  ngOnInit(): void {
    this.budget$ = this.ynab.getBudgetById(this.route.snapshot.params['id']);
  }
}
