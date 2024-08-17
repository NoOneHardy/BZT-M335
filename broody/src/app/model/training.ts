import {Plan} from './plan'
import {Set} from './set'

export interface Training {
  plan: Plan
  exercises: {
    name: string
    sets: Set[]
  }[]
}
