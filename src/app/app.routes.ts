import { Routes } from '@angular/router';

import { authGuard } from './shared/services/auth/auth.guard';
import { BudgetCardsComponent } from './reports/feature/budget-cards/budget-cards.component';
import { HomeComponent } from './home/home.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { DashboardComponent } from './reports/feature/dashboard/dashboard.component';
import { dashboardRoutes } from './reports/feature/dashboard/dashboard.routes';

// TODO: Privacy policy route
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'privacy', component: PrivacyComponent },
  // TODO: Refactor to use child routes
  { path: 'budgets', component: BudgetCardsComponent, canActivate: [authGuard] },
  {
    path: 'budgets/:id/dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: dashboardRoutes,
  },
  { path: '**', redirectTo: '' },
];
