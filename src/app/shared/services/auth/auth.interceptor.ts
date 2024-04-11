import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';

import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  return req.url.startsWith('https://api.ynab.com/v1')
    ? next(
        req.clone({
          headers: req.headers.append(
            'Authorization',
            `Bearer ${inject(AuthService).token$?.value}`,
          ),
        }),
      )
    : next(req);
};
