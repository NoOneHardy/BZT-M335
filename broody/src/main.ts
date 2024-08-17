import {defineCustomElements} from '@ionic/pwa-elements/loader'
import {bootstrapApplication} from '@angular/platform-browser'
import {AppComponent} from './app/app.component'
import {appConfig} from './app/app.config'

defineCustomElements(window)

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.log(err))
