import {inject, Injectable} from '@angular/core'
import {Plan} from '../model/plan'
import {Training} from '../model/training'
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private router = inject(Router)

  private _training?: Training

  get training() {
    return this._training
  }

  start(plan: Plan) {
    this._training = {
      plan: plan,
      exercises: plan.exercises
    }
    this._training.plan.last_training = new Date()

    this.router.navigateByUrl('/training').then()
  }
}
