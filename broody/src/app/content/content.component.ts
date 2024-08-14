import {Component, Input} from '@angular/core';
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
}
