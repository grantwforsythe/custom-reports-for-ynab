import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { AuthService } from '../shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.handleAuthentication();
  }

  login(): void {
    this.authService.authenticate();
  }

  logout(): void {
    this.authService.logout();
  }
}
