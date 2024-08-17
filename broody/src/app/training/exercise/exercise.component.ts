import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {FormArray, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms'
import {NgForOf, NgIf} from '@angular/common'
import {TemplateSet} from '../../model/template-set'

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    ReactiveFormsModule
  ]
})
export class ExerciseComponent implements OnInit {
  @Input() set?: TemplateSet
  @Output() valueChanges = new EventEmitter<{ configurations: {value: number | string | null, name: string, suffix?: string }[]}>()

  form = new FormGroup({
    configurations: new FormArray<ConfigForm>([])
  })

  ngOnInit() {
    this.prepareForm()
  }

  blur() {
    if (!this.set) return

    const configurations = this.set.configurations
    const index = configurations.findIndex(c => c.name === 'Gewicht')
    const weight = this.form.value.configurations?.find(c => c.name === 'Gewicht')

    if (index < 0 || !weight) return

    configurations[index].value = weight.value ?? 0

    this.valueChanges.emit({
      configurations: configurations
    })
  }

  prepareForm() {
    if (!this.set) return

    const weightConfig = this.set.configurations.find(c => c.name === 'Gewicht')
    if (weightConfig) {
      this.form.controls.configurations.push(new FormGroup({
        value: new FormControl<number>(weightConfig.value ? Number(weightConfig.value) : 0, {
          nonNullable: true
        }),
        name: new FormControl<string>('Gewicht', {
          nonNullable: true
        }),
        suffix: new FormControl<string>(weightConfig.suffix, {
          nonNullable: true
        })
      }))
    }

    const repConfig = this.set.configurations.find(c => c.name === 'Minimum' || c.name === 'Maximum')
    if (repConfig) {
      this.form.controls.configurations.push(new FormGroup({
        value: new FormControl<number>(repConfig ? Number(repConfig.value) : 0, {
          nonNullable: true
        }),
        name: new FormControl<string>('Reps', {
          nonNullable: true
        }),
        suffix: new FormControl<string>(repConfig.suffix, {
          nonNullable: true
        })
      }))
    }
  }
}

type ConfigForm = FormGroup<{ name: FormControl<string>, value: FormControl<number>, suffix: FormControl<string> }>
