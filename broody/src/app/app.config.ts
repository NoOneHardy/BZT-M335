import {ApplicationConfig} from '@angular/core'
import {provideRouter} from '@angular/router'
import routes from './app.routes'
import {initializeApp, provideFirebaseApp} from '@angular/fire/app'
import {getAuth, provideAuth} from '@angular/fire/auth'
import {getDatabase, provideDatabase} from '@angular/fire/database'
import {environment} from '../environments/environment'
import {provideIonicAngular} from '@ionic/angular/standalone'
import {FIREBASE_OPTIONS} from '@angular/fire/compat'

export const appConfig: ApplicationConfig = {
  providers: [
    provideIonicAngular(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    {provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig}
  ]
}
