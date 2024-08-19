import {Component, inject, OnInit} from '@angular/core'
import {ContentComponent} from '../content/content.component'
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {PlanService} from '../services/plan.service'
import {Plan} from '../model/plan'
import {debounceTime, distinctUntilChanged, Subject} from 'rxjs'
import {TrainingService} from '../services/training.service'

@Component({
  standalone: true,
  imports: [
    ContentComponent,
    NgForOf,
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  private planService = inject(PlanService)
  private trainingService = inject(TrainingService)
  private touchTimeout?: number

  plans: Plan[] = []
  filteredPlans: Plan[] = []
  search$ = new Subject<string>()

  search(filter: string) {
    this.filteredPlans = this.plans.filter(plan => {
      const name = plan.name.trim().toLowerCase()
      const prepFilter = filter.trim().toLowerCase()
      return name.includes(prepFilter) || prepFilter.includes(name)
    })
  }

  ngOnInit() {
    this.trainingService.reset()

    this.planService.getPlans().subscribe(plans => {
      this.plans = plans
      this.filteredPlans = this.plans
    })

    this.search$.pipe(
      distinctUntilChanged(),
      debounceTime(250)
    ).subscribe(value => {
      this.search(value)
    })
  }

  handleClick(id: string, start: boolean = false) {
    if (start) {
      this.touchTimeout = setTimeout(() => {
        this.deletePlan(id)
        clearTimeout(this.touchTimeout)
        this.touchTimeout = undefined
      }, 3000)
      return
    }
    if (this.touchTimeout) {
      clearTimeout(this.touchTimeout)
      this.touchTimeout = undefined
      this.startPlan(id)
    }
  }

  deletePlan(id: string) {
    this.planService.removePlan(id)
  }

  startPlan(id: string) {
    this.planService.startPlan(id)
    this.trainingService.start(id)
  }
}
