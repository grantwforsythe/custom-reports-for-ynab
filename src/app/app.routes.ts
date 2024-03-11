import { Routes } from '@angular/router';

import { authGuard } from './services/auth/auth.guard';
import { BudgetsComponent } from './budgets/budgets.component';
import { LoginComponent } from './login/login.component';
import { BudgetDetailsComponent } from './budget-details/budget-details.component';

// TODO: 404 Route
// TODO: Privacy policy route
export const routes: Routes = [
  { path: '', component: LoginComponent },
  // TODO: Refactor to use child routes
  { path: 'budgets', component: BudgetsComponent, canActivate: [authGuard] },
  { path: 'budgets/:id', component: BudgetDetailsComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' },
];
