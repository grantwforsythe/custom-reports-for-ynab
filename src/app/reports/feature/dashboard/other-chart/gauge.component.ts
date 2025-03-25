import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { GaugeModule } from '@swimlane/ngx-charts';
import { Observable } from 'rxjs';

import { selectSortedResults } from '../../../../state/selectors/report.selectors';

@Component({
  selector: 'app-charts-gauge',
  imports: [AsyncPipe, GaugeModule],
  templateUrl: './gauge.component.html',
})
export class ChartsGaugeComponent implements OnInit {
  private store = inject(Store);

  results$!: Observable<{ value: number; name: string }[]>;

  ngOnInit(): void {
    this.results$ = this.store.select(selectSortedResults);
  }
}
