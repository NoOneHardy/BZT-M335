import {inject, Injectable} from '@angular/core'
import {Plan} from '../model/plan'
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

  getPlan(id: string): Observable<Plan | null> {
    return this.database.object<Plan>(`plans/${id}`).valueChanges()
  }

  addPlan(plan: Plan) {
    const sub = this.database.list('plans').valueChanges().subscribe(plans => {
      plan.id = this.database.createPushId()
      plans.push(plan)
      this.database.object('plans').set(plans).then()
      sub.unsubscribe()
    })
  }

  removePlan(id: string) {
    this.database.object(`plans/${id}`).remove().then()
  }

  startPlan(id: string) {
    this.database.object(`plans/${id}`).update({
      last_training: (new Date()).valueOf()
    }).then()
  }
}
