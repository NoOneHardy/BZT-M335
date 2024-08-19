import {inject, Injectable} from '@angular/core'
import {Machine} from '../model/machine'
import {PlanService} from './plan.service'
import {ExerciseTemplate} from '../model/exercise-template'

@Injectable({
  providedIn: 'root'
})
export class PlanDataService {
  private planService = inject(PlanService)

  private _name: string | null = null
  private _machines: Machine[] = []
  private _exercises: ExerciseTemplate[] = []

  get machines(): Machine[] {
    return this._machines
  }

  set machines(machines: Machine[]) {
    this._machines = machines
  }

  set name(name: string) {
    this._name = name
  }

  get name(): string | null {
    return this._name
  }

  get exercises(): ExerciseTemplate[] {
    return this._exercises
  }

  set exercises(exercises: ExerciseTemplate[]) {
    this._exercises = exercises
  }

  save() {
    const name = this.name
    const exercises = this.exercises
    if (name && exercises.length > 0) {
      this.planService.addPlan({
        id: null,
        name: name,
        exercises: exercises,
        lastTraining: null
      })

      this.reset()
    }
  }

  reset() {
    this._name = null
    this.machines = []
    this.exercises = []
  }
}
