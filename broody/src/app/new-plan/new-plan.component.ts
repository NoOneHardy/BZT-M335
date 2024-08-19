import {Component, inject} from '@angular/core'
import {CommonModule, NgOptimizedImage} from '@angular/common'
import {ContentComponent} from '../content/content.component'
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import {MachineService} from '../services/machine.service'
import {Machine} from '../model/machine'
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
export class NewPlanComponent {
  private machineService = inject(MachineService)
  private planDataService = inject(PlanDataService)
  private router = inject(Router)

  form = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)]
    }),
    machines: new FormControl<Machine[]>([], {
      nonNullable: true,
      validators: [Validators.required]
    })
  })

  addMachine(id: string) {
    const sub = this.machineService.getMachine(id).subscribe(machine => {
      if (!machine) {
        // TODO: Show error message
        return
      }

      const selectedMachines = this.form.controls.machines.value
      selectedMachines.push(machine)
      this.form.controls.machines.setValue(selectedMachines)

      sub.unsubscribe()
    })
  }

  removeMachine(id: string) {
    const selectedMachines = this.selectedMachines
    this.form.controls.machines.setValue(selectedMachines.filter(machine => machine.id !== id))
  }

  get selectedMachines() {
    return this.form.controls.machines.value
  }

  submit() {
    if (this.form.invalid || this.selectedMachines.length < 1) {
      // TODO: Show error message
      return
    }

    const data = this.form.getRawValue()

    this.planDataService.name = data.name
    this.planDataService.machines = data.machines

    this.router.navigateByUrl('/plan/config/machines').then()
  }
}
