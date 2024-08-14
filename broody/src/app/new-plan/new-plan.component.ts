import {Component, inject} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common'
import {ContentComponent} from '../content/content.component'
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import {Exercise} from '../data/exercise'
import {MachineService} from '../services/machine.service'

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ContentComponent,
    ReactiveFormsModule,
    NgOptimizedImage
  ],
  selector: 'app-new-plan',
  templateUrl: 'new-plan.component.html',
  styleUrls: ['new-plan.component.scss']
})
export class NewPlanComponent {
  private machineService = inject(MachineService)

  machines = this.machineService.getMachines()

  form = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)]
    }),
    search: new FormControl<string>(''),
    exercises: new FormControl<Exercise[]>([], {
      nonNullable: true,
      validators: [Validators.required]
    })
  })

}
