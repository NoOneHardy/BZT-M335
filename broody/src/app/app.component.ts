import { Component } from '@angular/core';
import {IonicModule} from '@ionic/angular'
import {RouterModule} from '@angular/router'
import {NavigationComponent} from './navigation/navigation.component'

@Component({
  standalone: true,
  imports: [
    IonicModule,
    RouterModule,
    NavigationComponent
  ],
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
}
