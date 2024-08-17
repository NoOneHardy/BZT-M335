import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core'
import {Machine} from '../../../model/machine'
import {FormArray, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms'
import {NgForOf, NgIf} from '@angular/common'
import {PlanDataService} from '../../../services/plan-data.service'
import {Subject, takeUntil} from 'rxjs'
import {Exercise} from '../../../model/exercise'

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

  private planDataService = inject(PlanDataService)
  private unsubscribe$ = new Subject<void>()

  blur$ = new Subject<void>()
  form = new FormGroup({
    sets: new FormArray<Set>([])
  })

  ngOnInit() {
    this.addSet()
    this.blur$.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      const data = this.form.value
      const exercise: Exercise = {
        name: this.machine.name,
        sets: []
      }

      if (!data.sets) return

      exercise.sets = data.sets?.map(set => ({
        configurations: this.machine.configurations.map((config, index) => ({
          name: config.name,
          suffix: config.suffix,
          value: set[index]
        }))
      })) ?? []

      this.planDataService.setExercise(exercise)
    })
    this.newSet$?.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      console.log('Test')
      this.addSet()
    })

    this.blur$.next()
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
  }

  addSet() {
    const set: Set = new FormArray<FormControl>([])
    for (let _ of this.machine.configurations) {
      set.push(new FormControl<string | number | null>(null)
      )
    }
    this.form.controls.sets.push(set)
  }
}

type Set = FormArray<FormControl<string | number | null>>
