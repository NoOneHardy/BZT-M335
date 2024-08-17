import {Component, inject, OnInit, Signal} from '@angular/core'
import {CommonModule} from '@angular/common'
import {Plan} from '../model/plan'
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
export class HomeComponent implements OnInit {
  private planService = inject(PlanService)

  plans: Plan[] = []

  getGreeting() {
    const now = new Date()

    if (now.getHours() < 10) return 'Guten Morgen'
    if (now.getHours() < 18) return 'Hallo'
    else return 'Guten Abend'
  }

  ngOnInit() {
    this.planService.getPlans().subscribe(plans => {
      this.plans = plans
    })
  }
}
