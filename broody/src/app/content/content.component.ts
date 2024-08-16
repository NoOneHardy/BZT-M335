import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf, NgOptimizedImage} from '@angular/common'
import {RouterLink} from '@angular/router'

@Component({
  standalone: true,
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  imports: [
    NgOptimizedImage,
    RouterLink,
    NgIf
  ]
})
export class ContentComponent {
  @Input() name?: string
  @Input() route?: string
  @Input() button1?: string
  @Input() button2?: string
  @Input() button3?: string

  @Output() button1Click = new EventEmitter<void>()
  @Output() button2Click = new EventEmitter<void>()
  @Output() button3Click = new EventEmitter<void>()
}
