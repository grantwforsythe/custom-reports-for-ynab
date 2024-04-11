import { Injectable, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

import { environment as env } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  token$ = new BehaviorSubject<string | null>(localStorage.getItem('accessToken'));

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  authenticate(): void {
    window.location.href = `https://app.ynab.com/oauth/authorize?client_id=${env.auth.clientId}&redirect_uri=${window.location.origin}&response_type=token&scope=read-only`;
  }

  handleAuthentication(): void {
    this.route.fragment.pipe(takeUntil(this.destroy$)).subscribe((fragments: string | null) => {
      if (!fragments) return;

      const urlParams = new URLSearchParams(fragments);
      const accessToken = urlParams.get('access_token');
      // Time in seconds
      const expiresIn = urlParams.get('expires_in');

      this.router.navigateByUrl('/budgets');

      if (accessToken && expiresIn) {
        // Time in miliseconds
        const expiresAt: number = Number(expiresIn) * 1000 + new Date().getTime();
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('expiresAt', expiresAt.toString());
        this.token$.next(accessToken);
      }
    });
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expiresAt');
    this.token$.next(null);
    this.router.navigateByUrl('/');
  }

  isAuthenticated(): boolean {
    const accessToken = localStorage.getItem('accessToken');
    const expiresAt = localStorage.getItem('expiresAt');
    return !!accessToken && !!expiresAt && Number(expiresAt) > new Date().getTime();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
