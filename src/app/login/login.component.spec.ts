import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AuthService } from '../shared/services/auth/auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('AuthService', [
      'authenticate',
      'handleAuthentication',
      'logout',
      'isAuthenticated',
      'ngOnDestroy',
    ]);
    TestBed.configureTestingModule({
      providers: [LoginComponent, { provide: AuthService, useValue: spy }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should call #authService.handleAuthentication() on #ngOnInit()', () => {
    component.ngOnInit();
    expect(authServiceSpy.handleAuthentication).toHaveBeenCalled();
  });

  it('should call #authService.authenticate() on #login()', () => {
    component.login();
    expect(authServiceSpy.authenticate).toHaveBeenCalled();
  });

  it('should call #authService.logout() on #logout()', () => {
    component.logout();
    expect(authServiceSpy.logout).toHaveBeenCalled();
  });

  it('should display login button', () => {
    authServiceSpy.isAuthenticated.and.returnValue(false);

    fixture.detectChanges();

    const button: HTMLElement = fixture.nativeElement.querySelector('button');
    expect(button.textContent).toEqual('Authenticate');
  });

  it('should display logout button', () => {
    authServiceSpy.isAuthenticated.and.returnValue(true);

    fixture.detectChanges();

    const button: HTMLElement = fixture.nativeElement.querySelector('button');
    expect(button.textContent).toEqual('Logout');
  });
});
