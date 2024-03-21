import { Component, OnInit, inject } from '@angular/core';
import { ChartsBarVerticalComponent } from './charts/bar-vertical/bar-vertical.component';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { ReportActions } from '../../data-access/report.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true,
  imports: [ChartsBarVerticalComponent, RouterOutlet],
})
export class DashboardComponent implements OnInit {
  store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(ReportActions.initReportData());
  }
}
