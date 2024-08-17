import {Component, inject, OnDestroy, OnInit, Signal} from '@angular/core'
import {CommonModule, NgOptimizedImage} from '@angular/common'
import {ContentComponent} from '../content/content.component'
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import {MachineService} from '../services/machine.service'
import {Machine} from '../data/machine'
import {debounceTime, distinctUntilChanged, Subject, takeUntil} from 'rxjs'
import {NavigationItemComponent} from '../navigation-item/navigation-item.component'
import {MachineListComponent} from './machine-list/machine-list.component'
import {PlanDataService} from '../services/plan-data.service'
import {Router} from '@angular/router'

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ContentComponent,
    ReactiveFormsModule,
    NgOptimizedImage,
    NavigationItemComponent,
    MachineListComponent
  ],
  selector: 'app-new-plan',
  templateUrl: 'new-plan.component.html',
  styleUrls: ['new-plan.component.scss']
})
export class NewPlanComponent implements OnInit, OnDestroy {
  private machineService = inject(MachineService)
  private planDataService = inject(PlanDataService)
  private router = inject(Router)
  private unsubscribe$ = new Subject<void>()

  machines: Signal<Machine[]> =  this.machineService.getMachines()
  searchValue?: string

  form = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)]
    }),
    search: new FormControl<string>('', {
      nonNullable: true
    }),
    machines: new FormControl<Machine[]>([], {
      nonNullable: true,
      validators: [Validators.required]
    })
  })

  ngOnInit() {
    this.form.controls.search.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(250),
      takeUntil(this.unsubscribe$)
    ).subscribe(value => {
      this.searchValue = value
    })
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
  }

  addMachine(machine: Machine) {
    const selectedMachines = this.form.controls.machines.getRawValue()
    selectedMachines.push(machine)
    this.form.controls.machines.setValue(selectedMachines)
  }

  removeMachine(machine: Machine) {
    const selectedMachines = this.form.controls.machines.getRawValue()
    const index = selectedMachines.indexOf(machine)
    selectedMachines.splice(index, 1)
    this.form.controls.machines.setValue(selectedMachines)
  }

  get selectedMachines() {
    return this.form.controls.machines.value
  }

  submit() {
    if (this.form.invalid || this.selectedMachines.length < 1) return

    this.planDataService.setName(this.form.controls.name.value)
    this.planDataService.setMachines(this.selectedMachines)

    this.router.navigateByUrl('/plan/config/machines').then()
  }
}
