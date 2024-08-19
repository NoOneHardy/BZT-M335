import {Component, Input, OnDestroy, OnInit} from '@angular/core'
import {Machine} from '../../../model/machine'
import {FormArray, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms'
import {NgForOf, NgIf} from '@angular/common'
import {Subject, takeUntil} from 'rxjs'
import {ExerciseTemplate} from '../../../model/exercise-template'
import {Configuration} from '../../../model/configuration'

@Component({
  selector: 'app-machine-config',
  templateUrl: './machine-config.component.html',
  styleUrls: ['./machine-config.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgForOf
  ]
})
export class MachineConfigComponent implements OnInit, OnDestroy {
  @Input() machine!: Machine
  @Input() newSet$?: Subject<void>
  
  private unsubscribe$ = new Subject<void>()

  blur$ = new Subject<void>()
  form = new FormGroup({
    sets: new FormArray<SetForm>([])
  })

  ngOnInit() {
    this.addSet()
    this.blur$.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      // TODO: Save data more efficient
      const data = this.form.value
      const exercise: ExerciseTemplate = {
        machine: this.machine,
        sets: []
      }

      if (!data.sets) return

      exercise.sets = data.sets.map(set => {
        return {
          configurations: this.machine.configurations.map((config, index): Configuration => ({
            name: config.name,
            value: set[index].value ?? null
          }))
        }
      })
    })
    this.newSet$?.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.addSet()
    })

    this.blur$.next()
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
  }

  addSet() {
    const set: SetForm = new FormArray<FormGroup>([])
    for (let _ of this.machine.configurations) {
      set.push(new FormGroup({
        value: new FormControl<string | number | null>(null)
      }))
    }
    this.form.controls.sets.push(set)
  }
}

type SetForm = FormArray<FormGroup<{value: FormControl<string | number | null>}>>
