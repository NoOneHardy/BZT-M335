import {Component} from '@angular/core';
import {CommonModule} from '@angular/common'
import {ContentComponent} from '../content/content.component'

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ContentComponent
  ],
  selector: 'app-new-plan',
  templateUrl: 'new-plan.component.html',
  styleUrls: ['new-plan.component.scss']
})
export class NewPlanComponent {

}
