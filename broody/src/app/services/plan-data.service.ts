import { Injectable } from '@angular/core';
import {Machine} from '../data/machine'

@Injectable({
  providedIn: 'root'
})
export class PlanDataService {
  private data: {
    name?: string
    machines?: Machine[]
  } = {}

  getMachine(id: string): Machine | undefined {
    return this.data.machines?.find(m => m.id === id)
  }

  setMachines(machines: Machine[]) {
    this.data.machines = machines
  }

  setName(name: string) {
    this.data.name = name
  }
}
