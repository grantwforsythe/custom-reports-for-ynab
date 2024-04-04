import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { reportActions } from '../../data-access/report.actions';
import { DashboardFormComponent } from './reports-form/dashboard-form.component';
import { Observable } from 'rxjs';
import { selectChartType } from '../../data-access/report.selectors';
import { AsyncPipe } from '@angular/common';
import { ChartsBarVerticalComponent } from './bar-chart/bar-vertical.component';
import { ChartsBarHorizontalComponent } from './bar-chart/bar-horizontal.component';

// TODO: Refactor the charts into a module
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true,
  imports: [
    RouterOutlet,
    DashboardFormComponent,
    AsyncPipe,
    ChartsBarVerticalComponent,
    ChartsBarHorizontalComponent,
  ],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  chartType$: Observable<string | null> = this.store.select(selectChartType);

  ngOnInit(): void {
    this.store.dispatch(reportActions.initReportData());
  }

  ngOnDestroy(): void {
    this.store.dispatch(reportActions.resetReportData());
  }
}
