import {Machine} from './machine'
import {SetTemplate} from './set-template'

export interface ExerciseTemplate {
  machine: Machine
  sets: SetTemplate[]
}
