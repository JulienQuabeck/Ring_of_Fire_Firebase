import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-neu","appId":"1:484749620554:web:875c85a2ef014b73e03db3","storageBucket":"ring-of-fire-neu.appspot.com","apiKey":"AIzaSyCWlbZkNJ1OmIXh9NuOcegiVXPky1Omdao","authDomain":"ring-of-fire-neu.firebaseapp.com","messagingSenderId":"484749620554"})), provideFirestore(() => getFirestore())]
};
