import {inject, Injectable, Signal} from '@angular/core';
import {Plan} from '../data/plan'
import {toSignal} from '@angular/core/rxjs-interop'
import {AngularFireDatabase} from '@angular/fire/compat/database'

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private database = inject(AngularFireDatabase)

  getPlans(): Signal<Plan[]> {
    return toSignal(this.database.list<Plan>('plans').valueChanges(), {
      initialValue: []
    })
  }

  addPlan(plan: Plan) {
    const sub = this.database.list('plans').valueChanges().subscribe(plans => {
      plans.push(plan)
      this.database.object('plans').set(plans)
      sub.unsubscribe()
    })
  }
}
