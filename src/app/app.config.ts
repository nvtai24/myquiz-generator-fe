import { ApplicationConfig, provideZonelessChangeDetection, APP_INITIALIZER, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { baseUrlInterceptor } from './interceptors/base-url.interceptor';
import { inject } from '@vercel/analytics';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([baseUrlInterceptor, authInterceptor])),
    provideZonelessChangeDetection(),
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        return () => {
          inject({
            mode: isDevMode() ? 'development' : 'production',
          });
        };
      },
      multi: true,
    },
  ]
};
