import {Component, Input} from '@angular/core'
import {Configuration} from '../data/configuration'
import {NgIf} from '@angular/common'

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
  standalone: true,
  imports: [
    NgIf
  ]
})
export class ConfigComponent {
  @Input() config?: Configuration
  @Input() readonly = false
}
