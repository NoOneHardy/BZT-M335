import {Component, inject, Signal} from '@angular/core';
import {CommonModule} from '@angular/common'
import {FirebaseService} from '../services/firebase.service'
import {Plan} from '../data/plan'
import {ContentComponent} from '../content/content.component'
import {RouterLink} from '@angular/router'
import {NavigationItemComponent} from '../navigation-item/navigation-item.component'
import {PlanService} from '../services/plan.service'

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ContentComponent,
    RouterLink,
    NavigationItemComponent
  ],
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent {
  private planService = inject(PlanService)

  plans: Signal<Plan[]> = this.planService.getPlans()

  getGreeting() {
    const now = new Date()

    if (now.getHours() < 10) return 'Guten Morgen'
    if (now.getHours() < 18) return 'Hallo'
    else return 'Guten Abend'
  }
}
