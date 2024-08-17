import {Exercise} from './exercise'

export interface Plan {
  id?: string
  name: string
  exercises: Exercise[]
  last_training: Date | null
}
