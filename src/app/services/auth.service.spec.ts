import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { environment as env } from '../../environments/environment';

import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';

describe('AuthService', () => {
  let authService: AuthService;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthService,
        {
          provide: ActivatedRoute,
          useValue: {
            fragment: new BehaviorSubject<string | null>('access_token=token&expires_in=7200'),
          },
        },
      ],
    });

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  // describe('handleAuthentication', () => {
  //   it('should handle authentication', () => {
  //     const spyNavigateByUrl = spyOn(router, 'navigateByUrl');
  //     const fragments = 'access_token=token&expires_in=7200';
  //     authService.handleAuthentication();
  //     expect(spyNavigateByUrl).toHaveBeenCalledWith('/');
  //     expect(localStorage.getItem('accessToken')).toBe('token');
  //     expect(localStorage.getItem('expiresAt')).toBeDefined();
  //   });
  // });
});
