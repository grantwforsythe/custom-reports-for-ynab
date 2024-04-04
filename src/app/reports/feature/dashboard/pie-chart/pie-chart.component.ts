import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectReportResults } from '../../../data-access/report.selectors';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-charts-pie-chart',
  standalone: true,
  imports: [AsyncPipe, NgxChartsModule],
  templateUrl: './pie-chart.component.html',
})
export class ChartsPieChartComponent implements OnInit {
  private store = inject(Store);

  results$!: Observable<{ value: number; name: string | undefined }[]>;

  ngOnInit(): void {
    this.results$ = this.store.select(selectReportResults);
  }
}
