import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { reportActions } from '../../data-access/report.actions';
import { DashboardFormComponent } from './reports-form/dashboard-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true,
  imports: [RouterOutlet, DashboardFormComponent],
})
export class DashboardComponent implements OnInit {
  store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(reportActions.initReportData());
  }
}
