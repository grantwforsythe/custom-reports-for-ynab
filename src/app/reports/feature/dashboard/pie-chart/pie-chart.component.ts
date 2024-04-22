import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { PieChartModule } from '@swimlane/ngx-charts';
import { Observable } from 'rxjs';

import { selectSortedResults } from '../../../../state/selectors/report.selectors';

@Component({
  selector: 'app-charts-pie-chart',
  standalone: true,
  imports: [AsyncPipe, PieChartModule],
  templateUrl: './pie-chart.component.html',
})
export class ChartsPieChartComponent implements OnInit {
  private store = inject(Store);

  results$!: Observable<{ value: number; name: string | undefined }[]>;

  ngOnInit(): void {
    this.results$ = this.store.select(selectSortedResults);
  }
}
