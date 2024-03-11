import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule],
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
