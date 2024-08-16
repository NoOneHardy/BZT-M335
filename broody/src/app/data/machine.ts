import {Configuration} from './configuration'

export interface Machine {
  id: string
  name: string,
  configurations: Configuration[]
}
