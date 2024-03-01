import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from './services/auth/auth.guard';
import { BudgetsComponent } from './budgets/budgets.component';
import { BudgetDetailsComponent } from './budget-details/budget-details.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  // TODO: Refactor to use child routes
  { path: 'budgets', component: BudgetsComponent, canActivate: [authGuard] },
  { path: 'budgets/:id', component: BudgetDetailsComponent, canActivate: [authGuard] },
];
