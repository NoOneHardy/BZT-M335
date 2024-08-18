import {inject, Injectable} from '@angular/core'
import {Plan} from '../model/plan'
import {Training} from '../model/training'
import {Router} from '@angular/router'
import {Set} from '../model/set'

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private router = inject(Router)

  private _training?: Training
  private _trainingIndex?: number

  get training() {
    return this._training
  }

  get trainingIndex() {
    return this._trainingIndex
  }

  start(plan: Plan, index: number) {
    this._training = {
      plan: plan,
      exercises: [...plan.exercises]
    }
    this._training.plan.last_training = (new Date()).toString()
    this._trainingIndex = index

    this.router.navigateByUrl('/training').then()
  }

  reset() {
    this._training = undefined
  }

  setExercise(exercise: {
    name: string
    sets: Set[]
  }) {
    if (!this._training) return

    const i = this._training.exercises.findIndex(e => e.name === exercise.name)
    if (i < 0) return

    this._training.exercises[i] = exercise
  }
}
