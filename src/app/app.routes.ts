import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { BudgetCardsComponent } from './reports/feature/budget-cards/budget-cards.component';
import { DashboardComponent } from './reports/feature/dashboard/dashboard.component';
import { authGuard } from './shared/services/auth/auth.guard';

// TODO: Privacy policy route
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'privacy', component: PrivacyComponent },
  // TODO: Refactor to use child routes
  {
    path: 'budgets',
    component: BudgetCardsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'budgets/:id/dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '' },
];
