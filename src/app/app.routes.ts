import { Routes } from '@angular/router';

import { authGuard } from './services/auth/auth.guard';
import { BudgetsComponent } from './budgets/budgets.component';
import { BudgetDetailsComponent } from './budget-details/budget-details.component';
import { HomeComponent } from './home/home.component';
import { PrivacyComponent } from './privacy/privacy.component';

// TODO: Privacy policy route
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'privacy', component: PrivacyComponent },
  // TODO: Refactor to use child routes
  { path: 'budgets', component: BudgetsComponent, canActivate: [authGuard] },
  { path: 'budgets/:id', component: BudgetDetailsComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' },
];
