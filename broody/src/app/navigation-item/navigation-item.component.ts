import {Component, Input} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router'
import {NgIf, NgOptimizedImage} from '@angular/common'

@Component({
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf,
    NgOptimizedImage
  ],
  selector: 'app-navigation-item',
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.scss'],
})
export class NavigationItemComponent {
  @Input() icon?: string
  @Input() route?: string
  @Input() displayName?: string

  getIcon() {
    return `assets/icon/${this.icon}.svg`
  }
}
