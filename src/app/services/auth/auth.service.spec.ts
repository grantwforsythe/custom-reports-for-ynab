import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from './auth.service';
import { of } from 'rxjs';

describe('AuthService', () => {
  let authService: AuthService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthService,
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigateByUrl']),
        },
        {
          provide: ActivatedRoute,
          useValue: { fragment: of('access_token=Test&expires_in=7200') },
        },
      ],
    });

    authService = TestBed.inject(AuthService);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  afterEach(() => {
    authService.logout();
  });

  it('should be created', () => {
    expect(authService).toBeDefined();
  });

  it('should handle authentication', () => {
    authService.handleAuthentication();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/');
    expect(localStorage.getItem('accessToken')).toBe('Test');
    expect(authService.token$.value).toBe('Test');
    expect(Number(localStorage.getItem('expiresAt'))).toBeGreaterThan(7200);
  });

  it('should logout', () => {
    authService.logout();
    expect(localStorage.getItem('accessToken')).toBeNull();
    expect(localStorage.getItem('expiresAt')).toBeNull();
    expect(authService.token$.value).toBeNull();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/');
  });

  describe('#isAuthenticated()', () => {
    it('should be true if authenticated', () => {
      authService.handleAuthentication();
      expect(authService.isAuthenticated()).toBeTrue();
    });

    it('should be false if unauthenticated', () => {
      expect(localStorage.getItem('accessToken')).toBeNull();
      expect(localStorage.getItem('expiresAt')).toBeNull();
      expect(authService.isAuthenticated()).toBeFalse();
    });

    it('should be false if token has expired', () => {
      authService.handleAuthentication();

      const expiresAt: number = new Date().getTime() - 1;
      localStorage.setItem('expiresAt', expiresAt.toString());

      expect(authService.isAuthenticated()).toBeFalse();
    });
  });
});
