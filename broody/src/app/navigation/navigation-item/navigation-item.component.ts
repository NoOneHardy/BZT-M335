import {Component, inject, Input} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router'
import {NgIf, NgOptimizedImage} from '@angular/common'
import {IonicModule} from '@ionic/angular'
import {BatteryService} from '../../services/battery.service'

@Component({
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf,
    IonicModule,
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

  getIcon(active: boolean) {
    return `assets/icon/${this.icon}-${active ? this.batteryService.primaryColor : 'ffffff'}.svg`
  }
}
