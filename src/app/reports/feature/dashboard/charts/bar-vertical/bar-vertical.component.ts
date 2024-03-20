import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Store } from '@ngrx/store';
import { selectReportResults } from '../../../../data-access/report.selectors';

@Component({
  selector: 'app-charts-bar-vertical',
  standalone: true,
  imports: [AsyncPipe, NgxChartsModule],
  templateUrl: './bar-vertical.component.html',
})
export class ChartsBarVerticalComponent implements OnInit {
  store = inject(Store);

  results$: Observable<{ value: number; name: string }[]> | undefined;

  ngOnInit(): void {
    this.results$ = this.store.select(selectReportResults);
  }
}
