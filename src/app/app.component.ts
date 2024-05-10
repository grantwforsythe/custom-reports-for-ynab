import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterModule, RouterOutlet } from '@angular/router';

import { environment as env } from '../environments/environment';
import { AnalyticsService } from './analytics.service';
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
export class AppComponent implements OnInit {
  auth = inject(AuthService);
  analytics = inject(AnalyticsService);

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

  ngOnInit() {
    if (env.production) {
      this.analytics.injectScript().subscribe({
        next: console.log,
        error: console.error,
      });
    }
  }
}
