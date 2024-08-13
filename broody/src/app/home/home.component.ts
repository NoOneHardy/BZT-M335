import {Component} from '@angular/core';
import {IonicModule} from '@ionic/angular'
import {CommonModule} from '@angular/common'
import {NavigationComponent} from '../navigation/navigation.component'

@Component({
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    NavigationComponent
  ],
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent {
}
