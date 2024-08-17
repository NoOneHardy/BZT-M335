import {inject, Injectable} from '@angular/core'
import {Machine} from '../data/machine'
import {Exercise} from '../data/exercise'
import {PlanService} from './plan.service'

@Injectable({
  providedIn: 'root'
})
export class PlanDataService {
  private planService = inject(PlanService)

  private data: {
    name?: string
    machines: Machine[]
    exercises: Exercise[]
  } = {
    machines: [],
    exercises: []
  }

  getMachines(): Machine[] {
    return this.data.machines
  }

  setMachines(machines: Machine[]) {
    this.data.machines = machines
    this.data.exercises = []
  }

  setName(name: string) {
    this.data.name = name
  }

  setExercise(exercise: Exercise) {
    const index = this.data.exercises.findIndex(e => e.name === exercise.name)
    if (index < 0) {
      this.data.exercises.push(exercise)
    } else {
      this.data.exercises[index] = exercise
    }
  }

  save() {
    if (this.data.name && this.data.exercises.length > 0) {
      this.planService.addPlan({
        name: this.data.name,
        exercises: this.data.exercises
      })

      this.data = {
        machines: [],
        exercises: []
      }
    }
  }
}
