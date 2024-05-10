import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { reportActions } from '../../../state/actions/report.actions';
import { selectChartType } from '../../../state/selectors/report.selectors';
import { ChartsBarHorizontalComponent } from './bar-chart/bar-horizontal.component';
import { ChartsBarVerticalComponent } from './bar-chart/bar-vertical.component';
import { ChartsNumberCardsComponent } from './other-chart/number-cards.component';
import { ChartsTreeMapComponent } from './other-chart/tree-map.component';
import { ChartsPieChartComponent } from './pie-chart/pie-chart.component';
import { DashboardFormComponent } from './reports-form/dashboard-form.component';

// TODO: Refactor the charts into a module
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [
    RouterOutlet,
    DashboardFormComponent,
    AsyncPipe,
    ChartsBarVerticalComponent,
    ChartsBarHorizontalComponent,
    ChartsPieChartComponent,
    ChartsTreeMapComponent,
    ChartsNumberCardsComponent,
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
