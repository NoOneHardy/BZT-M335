import {Component, inject, OnInit} from '@angular/core'
import {ContentComponent} from '../content/content.component'
import {TrainingService} from '../services/training.service'
import {NgForOf, NgIf} from '@angular/common'
import {Exercise} from '../model/exercise'
import {SwipeService} from '../services/swipe.service'
import {ExerciseComponent} from './exercise/exercise.component'
import {ConfigComponent} from './config/config.component'
import {Router} from '@angular/router'
import {TemplateSet} from '../model/template-set'
import {Set} from '../model/set'
import {PlanService} from '../services/plan.service'
import {Configuration} from '../model/configuration'

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
  standalone: true,
  imports: [
    ContentComponent,
    NgIf,
    NgForOf,
    ExerciseComponent,
    ConfigComponent
  ]
})
export class TrainingComponent implements OnInit {
  private trainingService = inject(TrainingService)
  private planService = inject(PlanService)
  private swipeService = inject(SwipeService)
  private router = inject(Router)

  training = this.trainingService.training
  activeExercise = 0

  ngOnInit() {
    if (!this.training) {
      this.router.navigateByUrl('/overview').then()
      return
    }

    this.swipeService.swipeDir$.subscribe(dir => {
      if (dir < 0) this.next()
      if (dir > 0) this.previous()
    })
  }

  next() {
    if (this.training && this.activeExercise < this.training?.exercises.length - 1) {
      this.activeExercise++
    }
  }

  previous() {
    if (this.activeExercise > 0) this.activeExercise--
  }

  isPrev(exercise: Exercise) {
    if (this.training) return this.training.exercises.indexOf(exercise) < this.activeExercise
    return false
  }

  isNext(exercise: Exercise) {
    if (this.training) return this.training.exercises.indexOf(exercise) > this.activeExercise
    return false
  }

  swipe(e: TouchEvent, when: 'start' | 'end') {
    this.swipeService.swipe(e, when)
  }

  isFirst() {
    return this.activeExercise == 0
  }

  isLast() {
    if (!this.training) return false
    return this.activeExercise == this.training.exercises.length - 1
  }

  valueChanges(set: Set, eIndex: number, setIndex: number) {
    if (!this.training) return

    console.log(this.training.exercises)

    const sets = this.training.exercises[eIndex].sets
    sets[setIndex] = set

    this.trainingService.setExercise({
       name: this.training.plan.name,
       sets: sets
    })
  }

  save() {
    const index = this.trainingService.trainingIndex
    console.log(index)
    if (index == undefined || this.training == undefined) return

    this.planService.setPlan({
      name: this.training.plan.name,
      last_training: this.training.plan.last_training,
      exercises: this.training.plan.exercises.map((exercise, eIndex): Exercise => {
        return {
          name: exercise.name,
          sets: exercise.sets.map((set, sIndex): TemplateSet => {
            return {
              configurations: set.configurations.map((config, cIndex) => {
                if (config.name === 'Gewicht') {
                  return {
                    name: config.name,
                    value: this.training?.exercises[eIndex].sets[sIndex].configurations[cIndex].value ?? 0,
                    suffix: config.suffix
                  }
                }

                return {
                  name: config.name,
                  value: config.value ?? 0,
                  suffix: config.suffix
                }
              })
            }
          })
        }
      })
    }, index)

    this.router.navigateByUrl('/').then()
  }

  filterConfigurations(set: TemplateSet) {
    return set.configurations.filter(c => c.value)
  }
}
