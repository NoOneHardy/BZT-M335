import {Component, EventEmitter, inject, OnDestroy, OnInit, Output} from '@angular/core'
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common'
import {Machine} from '../../model/machine'
import {MachineService} from '../../services/machine.service'
import {debounceTime, distinctUntilChanged, Subject, takeUntil} from 'rxjs'
import {FormFieldComponent} from '../../form-field/form-field.component'
import {IconComponent} from '../../icon/icon.component'

@Component({
  selector: 'app-machine-list',
  templateUrl: './machine-list.component.html',
  styleUrls: ['./machine-list.component.scss'],
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgOptimizedImage,
    FormFieldComponent,
    IconComponent
  ]
})
export class MachineListComponent implements OnInit, OnDestroy {
  @Output() addMachine = new EventEmitter<string>()
  @Output() removeMachine = new EventEmitter<string>()

  private machineService = inject(MachineService)
  private unsubscribe$ = new Subject<void>()
  private machines: Machine[] = []
  private selectedMachines: Machine[] = []

  filteredMachines: Machine[] = []
  search$ = new Subject<string>()

  ngOnInit() {
    this.machineService.getMachines().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(machines => {
      this.machines = machines
      this.resetFilteredMachines()
    })

    this.search$.pipe(
      distinctUntilChanged(),
      debounceTime(300),
      takeUntil(this.unsubscribe$)
    ).subscribe(filter => {
      this.filterMachines(filter)
    })
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
  }

  filterMachines(filter: string) {
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
    if (!machine.id) {
      // TODO: Show error message
      return
    }

    if (this.isSelected(machine)) {
      this.selectedMachines = this.selectedMachines.filter(m => m.id !== machine.id)
      this.removeMachine.emit(machine.id)
    } else {
      this.selectedMachines.push(machine)
      this.addMachine.emit(machine.id)
    }
  }

  resetFilteredMachines() {
    this.filteredMachines = [
      ...this.machines
    ]
  }
}
