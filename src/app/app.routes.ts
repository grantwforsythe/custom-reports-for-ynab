import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from './services/auth/auth.guard';
import { BudgetsComponent } from './budgets/budgets.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'budgets', component: BudgetsComponent, canActivate: [authGuard] },
];
