import {Component} from '@angular/core'
import {ContentComponent} from '../content/content.component'

@Component({
  standalone: true,
  imports: [
    ContentComponent
  ],
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
}
