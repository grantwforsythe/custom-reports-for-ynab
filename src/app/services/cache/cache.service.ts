import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { CachedValue } from './interfaces/cache';

// 60 milliseconds
const MAX_AGE = 60 * 1000;

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  cache = new Map<string, CachedValue>();

  get(req: HttpRequest<unknown>): HttpResponse<unknown> | undefined {
    this.cache.forEach((expiredEntry) => {
      // Delete expired cache
      if (expiredEntry.lastRead < Date.now() - MAX_AGE) {
        this.cache.delete(expiredEntry.urlWithParams);
      }
    });

    const cached = this.cache.get(req.urlWithParams);

    return !cached ? undefined : cached.response;
  }

  put(req: HttpRequest<unknown>, response: HttpResponse<unknown>): void {
    this.cache.set(req.urlWithParams, {
      urlWithParams: req.urlWithParams,
      response,
      lastRead: Date.now(),
    });
  }
}
