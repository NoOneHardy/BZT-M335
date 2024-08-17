import {HomeComponent} from './home/home.component'
import {Routes} from '@angular/router'
import {NewPlanComponent} from './new-plan/new-plan.component'
import {OverviewComponent} from './overview/overview.component'
import {PlanConfigComponent} from './new-plan/plan-config/plan-config.component'
import {TrainingComponent} from './training/training.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'new',
    component: NewPlanComponent
  },
  {
    path: 'overview',
    component: OverviewComponent
  },
  {
    path: 'plan/config/machines',
    component: PlanConfigComponent
  },
  {
    path: 'training',
    component: TrainingComponent
  }
]

export default routes
