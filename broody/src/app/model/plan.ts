import {ExerciseTemplate} from './exercise-template'

export interface Plan {
  id: string | null
  name: string
  exercises: ExerciseTemplate[]
  lastTraining: number | null
}
