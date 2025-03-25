import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { authGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('authGuard', () => {
  const mockRoute: jasmine.SpyObj<ActivatedRouteSnapshot> =
    {} as jasmine.SpyObj<ActivatedRouteSnapshot>;
  const mockState: jasmine.SpyObj<RouterStateSnapshot> = {} as jasmine.SpyObj<RouterStateSnapshot>;

  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['isAuthenticated']),
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate']),
        },
      ],
    });

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should be true', () => {
    authServiceSpy.isAuthenticated.and.returnValue(true);
    expect(executeGuard(mockRoute, mockState)).toBe(true);
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should reroute to home', () => {
    authServiceSpy.isAuthenticated.and.returnValue(false);
    executeGuard(mockRoute, mockState);
    expect(routerSpy.navigate).toHaveBeenCalled();
  });
});
