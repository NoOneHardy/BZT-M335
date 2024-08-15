import {Component, inject, OnInit} from '@angular/core';
import {Machine} from '../../data/machine'
import {NgIf} from '@angular/common'
import {ActivatedRoute} from '@angular/router'
import {PlanDataService} from '../../services/plan-data.service'
import {ContentComponent} from '../../content/content.component'

@Component({
  selector: 'app-machine-config',
  templateUrl: './machine-config.component.html',
  styleUrls: ['./machine-config.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    ContentComponent
  ]
})
export class MachineConfigComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute)
  private planDataService = inject(PlanDataService)

  machine?: Machine

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if (id) {
      this.machine = this.planDataService.getMachine(id)
      console.log(this.machine)
    }
  }
}
