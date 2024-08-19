import {inject, Injectable} from '@angular/core'
import {Training} from '../model/training'
import {Router} from '@angular/router'
import {ExerciseTemplate} from '../model/exercise-template'
import {Exercise} from '../model/exercise'
import {PlanService} from './plan.service'
import {Subject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private router = inject(Router)
  private planService = inject(PlanService)

  private _training: Training | null = null

  private set training(training: Training | null) {
    this._training = training
  }

  get training(): Training | null {
    return this._training
  }

  start(id: string) {
    // Create subject to notify parent method whether start was successful or not
    const ready = new Subject<boolean>()

    // Get plan
    const sub = this.planService.getPlan(id).subscribe(plan => {
      // Notify parent that start failed if no plan was found
      if (!plan) {
        ready.next(false)
        return
      }

      const today = new Date()
      plan.lastTraining = today.valueOf()

      this.training = {
        id: null,
        plan: plan,
        exercises: this.mapExercisesFromTemplate(plan.exercises)
      }

      // Notify parent process
      ready.next(true)

      this.router.navigateByUrl('/training').then()
      sub.unsubscribe()
    })

    return ready
  }

  reset() {
    this.training = null
  }

  mapExercisesFromTemplate(templates: ExerciseTemplate[]): Exercise[] {
    return templates.map(template => {
      return {
        template: template,
        sets: []
      }
    })
  }
}
