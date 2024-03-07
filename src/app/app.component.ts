import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RouterOutlet } from '@angular/router';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoginComponent, MatIconModule, MatDividerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'github',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/github.svg'),
    );
  }
}
