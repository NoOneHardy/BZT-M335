import {Component, inject, OnInit} from '@angular/core'
import {ContentComponent} from '../content/content.component'
import {TrainingService} from '../services/training.service'
import {NgForOf, NgIf} from '@angular/common'
import {Exercise} from '../model/exercise'
import {SwipeService} from '../services/swipe.service'

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
  standalone: true,
  imports: [
    ContentComponent,
    NgIf,
    NgForOf
  ]
})
export class TrainingComponent implements OnInit {
  private trainingService = inject(TrainingService)
  private swipeService = inject(SwipeService)

  training = this.trainingService.training
  activeExercise = 0

  ngOnInit() {
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

  save() {

  }
}
