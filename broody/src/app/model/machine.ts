import {MuscleGroup} from './muscle-group'
import {ConfigurationTemplate} from './configuration-template'

export interface Machine {
  id: string | null
  name: string,
  muscleGroup: MuscleGroup
  configurations: ConfigurationTemplate[]
}
