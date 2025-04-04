import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { BarChartModule } from '@swimlane/ngx-charts';
import { Observable } from 'rxjs';

import { selectSortedResults } from '../../../../state/selectors/report.selectors';

@Component({
  selector: 'app-charts-bar-vertical',
  imports: [AsyncPipe, BarChartModule],
  templateUrl: './bar-vertical.component.html',
})
export class ChartsBarVerticalComponent implements OnInit {
  store = inject(Store);

  results$!: Observable<{ value: number; name: string | undefined }[]>;

  ngOnInit(): void {
    this.results$ = this.store.select(selectSortedResults);
  }
}
