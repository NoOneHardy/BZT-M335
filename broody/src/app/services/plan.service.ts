import {inject, Injectable, Signal} from '@angular/core'
import {Plan} from '../model/plan'
import {toSignal} from '@angular/core/rxjs-interop'
import {AngularFireDatabase} from '@angular/fire/compat/database'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private database = inject(AngularFireDatabase)

  getPlans(): Observable<Plan[]> {
    return this.database.list<Plan>('plans').valueChanges()
  }

  addPlan(plan: Plan) {
    const sub = this.database.list('plans').valueChanges().subscribe(plans => {
      plan.id = this.database.createPushId()
      plans.push(plan)
      this.database.object('plans').set(plans)
      sub.unsubscribe()
    })
  }

  removePlan(index: number) {
    this.database.object(`plans/${index}`).remove()
  }
}
