import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterModule, RouterOutlet } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthService } from './shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    LoginComponent,
    MatIconModule,
    MatDividerModule,
    MatToolbarModule,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  auth = inject(AuthService);

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'github',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/github.svg'),
    );
    iconRegistry.addSvgIcon(
      'charts',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/charts.svg'),
    );
  }
}
