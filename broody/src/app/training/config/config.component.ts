import {Component, Input, OnInit} from '@angular/core'
import {NgIf} from '@angular/common'
import {ReactiveFormsModule} from '@angular/forms'

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ]
})
export class ConfigComponent {
@Input() config?: {
  name: string
  value: string | number | null
  suffix?: string
}

}
