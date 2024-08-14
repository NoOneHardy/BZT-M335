import {Component, inject, OnInit, Signal} from '@angular/core';
import {CommonModule} from '@angular/common'
import {NavigationComponent} from '../navigation/navigation.component'
import {FirebaseService} from '../services/firebase.service'
import {Plan} from '../data/plan'

@Component({
  standalone: true,
  imports: [
    CommonModule,
    NavigationComponent
  ],
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent {
  private firebase = inject(FirebaseService)

  plans: Signal<Plan[]> = this.firebase.getPlans()
}
