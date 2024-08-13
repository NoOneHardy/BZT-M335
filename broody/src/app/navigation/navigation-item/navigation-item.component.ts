import {Component, inject, Input, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router'
import {NgIf, NgOptimizedImage} from '@angular/common'
import {IonicModule} from '@ionic/angular'
import {ViewportService} from '../../services/viewport.service'
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

  private viewportService = inject(ViewportService)
  private batteryService = inject(BatteryService)
  protected mobile = this.viewportService.isMobile

  getIcon(active: boolean) {
    return `assets/icon/${this.icon}-${active ? this.batteryService.systemColor : 'ffffff'}.svg`
  }
}
