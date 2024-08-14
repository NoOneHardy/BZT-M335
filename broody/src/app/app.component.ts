import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router'
import {FirebaseService} from './services/firebase.service'
import {BatteryService} from './services/battery.service'

@Component({
  standalone: true,
  imports: [
    RouterModule
  ],
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private firebase = inject(FirebaseService)
  private batteryService = inject(BatteryService)

  ngOnDestroy() {
    this.firebase.logout()
  }

  ngOnInit() {
    this.batteryService.init()
    this.firebase.login()
  }
}
