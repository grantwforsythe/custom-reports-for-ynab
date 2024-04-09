import { Component, Input } from '@angular/core';
import { FlagColor } from '../../../shared/services/ynab/interfaces/transactions/flagColor';

@Component({
  selector: 'app-charts-bar-vertical',
  standalone: true,
  templateUrl: './flag.component.html',
})
export class FlagIconComponent {
  @Input({ required: true })
  flag!: { color: FlagColor; name: string };
}
