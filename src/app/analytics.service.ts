import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  /**
   * Injects a script to track web analytics using Cloudflare's beacon.min.js.
   *
   * @return {Observable<Event>} An observable that emits an event when the script is successfully injected,
   * or an error event if the injection fails.
   */
  injectScript(): Observable<Event> {
    return new Observable(observer => {
      const script = document.createElement('script');
      script.defer = true;
      script.type = 'text/javascript';
      script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
      script.setAttribute('data-cf-beacon', '{"token": "f35c166c64154ae5822d35b80f4ed71e"}');

      script.onload = () => {
        observer.next(new Event('Cloudflare Web Analytics injected'));
        observer.complete();
      };
      script.onerror = () => {
        observer.error('Cloudflare Web Analytics injection failed');
      };

      document.head.appendChild(script);
    });
  }
}
