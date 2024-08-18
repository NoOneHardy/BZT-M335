import {Component, inject, OnInit} from '@angular/core'
import {CommonModule} from '@angular/common'
import {Plan} from '../model/plan'
import {ContentComponent} from '../content/content.component'
import {RouterLink} from '@angular/router'
import {NavigationItemComponent} from '../navigation-item/navigation-item.component'
import {PlanService} from '../services/plan.service'
import {TrainingService} from '../services/training.service'

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
  private trainingService = inject(TrainingService)

  plans: Plan[] = []

  getGreeting() {
    const now = new Date()

    if (now.getHours() < 10) return 'Guten Morgen'
    if (now.getHours() < 18) return 'Hallo'
    else return 'Guten Abend'
  }

  ngOnInit() {
    this.planService.getPlans().subscribe(plans => {
      this.plans = plans.filter(plan => plan.last_training).sort((a, b) => {
        if (!a.last_training || !b.last_training) return 0
        return a.last_training < b.last_training ? -1 : 1
      }).slice(0, 5)
    })
  }

  start(plan: Plan) {
    const index = this.plans.findIndex(p => p === plan)
    if (index >= 0) this.trainingService.start(plan, index)
  }
}
