import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { reportActions } from '../../data-access/report.actions';
import { selectChartType } from '../../data-access/report.selectors';
import { ChartsBarHorizontalComponent } from './bar-chart/bar-horizontal.component';
import { ChartsBarVerticalComponent } from './bar-chart/bar-vertical.component';
import { ChartsPieChartComponent } from './pie-chart/pie-chart.component';
import { DashboardFormComponent } from './reports-form/dashboard-form.component';

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
    ChartsPieChartComponent,
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
