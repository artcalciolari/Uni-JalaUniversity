import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideZonelessChangeDetection } from '@angular/core';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    // Habilita o modo "zoneless"
    provideZonelessChangeDetection(),
    // Fornece as rotas para a aplicação
    provideRouter(routes)
  ]
});