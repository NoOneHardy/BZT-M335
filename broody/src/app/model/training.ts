import {Plan} from './plan'
import {Exercise} from './exercise'

export interface Training {
  id: string | null
  plan: Plan
  exercises: Exercise[]
}
