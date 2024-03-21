import { Routes } from '@angular/router';
import { ChartsBarVerticalComponent } from './charts/bar-vertical/bar-vertical.component';
import { ChartsBarHorizontalComponent } from './charts/bar-horizontal/bar-horizontal.component';

export const dashboardRoutes: Routes = [
  { path: 'bar-vert', component: ChartsBarVerticalComponent },
  { path: 'bar-horz', component: ChartsBarHorizontalComponent },
];
