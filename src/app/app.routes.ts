import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { authGuard } from './shared/services/auth/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'privacy', component: PrivacyComponent },
  // TODO: Refactor to use child routes
  {
    path: 'budgets',
    loadComponent: () =>
      import('./reports/feature/budget-cards/budget-cards.component').then(
        (m) => m.BudgetCardsComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'budgets/:id/dashboard',
    loadComponent: () =>
      import('./reports/feature/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '' },
];
