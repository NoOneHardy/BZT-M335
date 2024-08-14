import {Component, inject, Input} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router'
import {NgIf, NgOptimizedImage} from '@angular/common'
import {BatteryService} from '../services/battery.service'

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

  private batteryService = inject(BatteryService)

  getIcon() {
    return `assets/icon/${this.icon}.svg`
  }
}
