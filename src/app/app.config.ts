import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';

import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { environment as env } from '../environments/environment';
import { routes } from './app.routes';
import { authInterceptor } from './shared/services/auth/auth.interceptor';
import { BudgetEffects } from './state/effects/budget-cards.effects';
import { ReportEffects } from './state/effects/report.effects';
import { budgetsReducers } from './state/reducers/budget-cards.reducers';
import { formReducer } from './state/reducers/dashboard-form.reducers';
import { reportReducer } from './state/reducers/report.reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideNativeDateAdapter(),
    provideAnimationsAsync(),
    provideStore({
      report: reportReducer,
      budget: budgetsReducers,
      form: formReducer,
      router: routerReducer,
    }),
    provideEffects([ReportEffects, BudgetEffects]),
    provideRouterStore(),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !env.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true, // If set to true, the connection is established within the Angular zone
    }),
  ],
};
