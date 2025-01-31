import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core'
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common'
import {Machine} from '../../model/machine'

@Component({
  selector: 'app-machine-list',
  templateUrl: './machine-list.component.html',
  styleUrls: ['./machine-list.component.scss'],
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgOptimizedImage
  ]
})
export class MachineListComponent implements OnChanges {
  @Input() machines: Machine[] = []
  @Input() selectedMachines: Machine[] = []
  @Input() filter?: string

  @Output() addMachine = new EventEmitter<Machine>()
  @Output() removeMachine = new EventEmitter<Machine>()

  filteredMachines: Machine[] = this.machines

  ngOnChanges(changes: SimpleChanges) {
    const filterChanges = changes['filter']
    const machineChanges = changes['machines']

    if (machineChanges) {
      if (machineChanges.currentValue) {
        this.filteredMachines = this.machines
      }
    }

    if (filterChanges) {
      if (filterChanges.currentValue) {
        this.searchMachines(filterChanges.currentValue)
      } else {
        this.filteredMachines = this.machines
      }
    }
  }

  searchMachines(filter: string) {
    this.filteredMachines = this.machines.filter(machine => {
      const name = machine.name.trim().toLowerCase()
      const prepFilter = filter.trim().toLowerCase()
      return name.includes(prepFilter) || prepFilter.includes(name)
    })
  }

  isSelected(machine: Machine) {
    return this.selectedMachines.includes(machine)
  }

  handleClick(machine: Machine) {
    if (this.isSelected(machine)) {
      this.removeMachine.emit(machine)
    } else {
      this.addMachine.emit(machine)
    }
  }
}
