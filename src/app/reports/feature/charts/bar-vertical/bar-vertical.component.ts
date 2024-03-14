import { AsyncPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-charts-bar-vertical',
  standalone: true,
  imports: [AsyncPipe, NgxChartsModule],
  templateUrl: './bar-vertical.component.html',
})
export class ChartsBarVerticalComponent {
  @Input()
  results$: Observable<{ name: string; value: number }[] | undefined> | undefined;

  constructor() {}
}
