import {Component, inject, OnInit} from '@angular/core'
import {Machine} from '../../model/machine'
import {NgForOf, NgIf} from '@angular/common'
import {PlanDataService} from '../../services/plan-data.service'
import {ContentComponent} from '../../content/content.component'
import {SwipeService} from '../../services/swipe.service'
import {MachineConfigComponent} from './machine-config/machine-config.component'
import {Subject} from 'rxjs'
import {Router} from '@angular/router'

@Component({
  selector: 'app-plan-config',
  templateUrl: './plan-config.component.html',
  styleUrls: ['./plan-config.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    ContentComponent,
    NgForOf,
    MachineConfigComponent
  ]
})
export class PlanConfigComponent implements OnInit {
  private planDataService = inject(PlanDataService)
  private swipeService = inject(SwipeService)
  private router = inject(Router)

  private activeMachine = 0

  machines: Machine[] = this.planDataService.getMachines()
  newSets$: Subject<void>[] = []

  ngOnInit() {
    for (let _ of this.machines) this.newSets$.push(new Subject<void>())
    this.swipeService.swipeDir$.subscribe(dir => {
      if (dir < 0) this.next()
      if (dir > 0) this.previous()
    })
  }

  next() {
    if (this.activeMachine < this.machines.length - 1) {
      this.activeMachine++
    }
  }

  previous() {
    if (this.activeMachine > 0) this.activeMachine--
  }

  isPrev(machine: Machine) {
    return this.machines.indexOf(machine) < this.activeMachine
  }

  isNext(machine: Machine) {
    return this.machines.indexOf(machine) > this.activeMachine
  }

  swipe(e: TouchEvent, when: 'start' | 'end') {
    this.swipeService.swipe(e, when)
  }

  isFirst() {
    return this.activeMachine == 0
  }

  isLast() {
    return this.activeMachine == this.machines.length - 1
  }

  save() {
    this.planDataService.save()
    this.router.navigateByUrl('/')
  }
}
