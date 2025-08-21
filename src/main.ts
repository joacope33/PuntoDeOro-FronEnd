// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router'; // Importa provideRouter
import { routes } from './app/app.routes'; // Asegúrate de que las rutas están importadas correctamente
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(), // Usa provideRouter con las rutas
  ],
});
