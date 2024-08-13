import {HomeComponent} from './home/home.component'
import {Routes} from '@angular/router'
import {NewPlanComponent} from './new-plan/new-plan.component'
import {OverviewComponent} from './overview/overview.component'

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
  }
]

export default routes
