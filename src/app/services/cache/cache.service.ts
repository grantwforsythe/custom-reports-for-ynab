import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { CachedValue } from './interfaces/cache';

const maxAge = 30000;
@Injectable({
  providedIn: 'root',
})
export class CacheService {
  cache = new Map<string, CachedValue>();

  get(req: HttpRequest<unknown>): HttpResponse<unknown> | undefined {
    const cached = this.cache.get(req.urlWithParams);

    return !cached ? undefined : cached.response;
  }

  put(req: HttpRequest<unknown>, response: HttpResponse<unknown>): void {
    this.cache.set(req.urlWithParams, {
      urlWithParams: req.urlWithParams,
      response,
      lastRead: Date.now(),
    });

    const expired = Date.now() - maxAge;

    // Delete expired cache
    this.cache.forEach((expiredEntry) => {
      if (expiredEntry.lastRead < expired) {
        this.cache.delete(expiredEntry.urlWithParams);
      }
    });
  }
}
