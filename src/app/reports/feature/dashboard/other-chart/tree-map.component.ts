import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { TreeMapModule } from '@swimlane/ngx-charts';
import { Observable } from 'rxjs';

import { selectSortedResults } from '../../../../state/selectors/report.selectors';

@Component({
  selector: 'app-charts-tree-map',
  standalone: true,
  imports: [AsyncPipe, TreeMapModule],
  templateUrl: './tree-map.component.html',
})
export class ChartsTreeMapComponent implements OnInit {
  private store = inject(Store);

  results$!: Observable<{ value: number; name: string }[]>;

  ngOnInit(): void {
    this.results$ = this.store.select(selectSortedResults);
  }
}
