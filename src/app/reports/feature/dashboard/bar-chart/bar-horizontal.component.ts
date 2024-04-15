import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { BarChartModule } from '@swimlane/ngx-charts';
import { Observable } from 'rxjs';

import { selectSortedResults } from '../../../../state/selectors/report.selectors';

@Component({
  selector: 'app-charts-bar-horizontal',
  standalone: true,
  imports: [AsyncPipe, BarChartModule],
  templateUrl: './bar-horizontal.component.html',
})
export class ChartsBarHorizontalComponent implements OnInit {
  store = inject(Store);

  results$: Observable<{ value: number; name: string | undefined }[]> | undefined;

  ngOnInit(): void {
    this.results$ = this.store.select(selectSortedResults);
  }
}
