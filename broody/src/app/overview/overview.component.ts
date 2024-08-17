import {Component, inject, Input, OnInit} from '@angular/core'
import {ContentComponent} from '../content/content.component'
import {NgForOf, NgOptimizedImage} from '@angular/common'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {PlanService} from '../services/plan.service'
import {Plan} from '../model/plan'
import {debounceTime, distinctUntilChanged, Subject} from 'rxjs'

@Component({
  standalone: true,
  imports: [
    ContentComponent,
    NgForOf,
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule
  ],
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  private planService = inject(PlanService)
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

  handleClick(planIndex: number, start: boolean = false) {
    if (start) {
      this.touchTimeout = setTimeout(() => {
        this.deletePlan(planIndex)
        clearTimeout(this.touchTimeout)
        this.touchTimeout = undefined
      }, 3000)
      return
    }
    if (this.touchTimeout) {
      clearTimeout(this.touchTimeout)
      this.touchTimeout = undefined
      this.startPlan()
    }
  }

  deletePlan(index: number) {
    this.planService.removePlan(index)
  }

  startPlan() {

  }
}
