import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
