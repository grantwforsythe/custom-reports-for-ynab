import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { NumberCardModule } from '@swimlane/ngx-charts';
import { Observable } from 'rxjs';

import { selectSortedResults } from '../../../../state/selectors/report.selectors';

@Component({
  selector: 'app-charts-number-cards',
  standalone: true,
  imports: [AsyncPipe, NumberCardModule],
  templateUrl: './number-cards.component.html',
})
export class ChartsNumberCardsComponent implements OnInit {
  private store = inject(Store);

  results$!: Observable<{ value: number; name: string }[]>;

  ngOnInit(): void {
    this.results$ = this.store.select(selectSortedResults);
  }
}
