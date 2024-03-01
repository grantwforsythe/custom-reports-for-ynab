import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, tap } from 'rxjs';
import { CacheService } from './cache.service';
import { inject } from '@angular/core';

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  const cache = inject(CacheService);

  // Skip all requests not made to YNAB's API
  if (!req.url.startsWith('https://api.ynab.com/v1')) {
    return next(req);
  }

  const cachedResponse = cache.get(req);

  return cachedResponse
    ? of(cachedResponse)
    : next(req).pipe(
        tap((event) => {
          // There may be other events besides the response.
          if (event instanceof HttpResponse) {
            cache.put(req, event); // Update the cache.
          }
        }),
      );
};
