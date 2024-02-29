import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
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
