import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { bootstrapApplication } from '@angular/platform-browser';

// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
