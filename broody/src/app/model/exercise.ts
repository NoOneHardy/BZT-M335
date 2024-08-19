import {ExerciseTemplate} from './exercise-template'
import {Set} from './set'

export interface Exercise {
  template: ExerciseTemplate
  sets: Set[]
}
