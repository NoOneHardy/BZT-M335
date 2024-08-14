import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {IonicModule} from '@ionic/angular'
import {RouterModule} from '@angular/router'
import {NavigationComponent} from './navigation/navigation.component'
import {FirebaseService} from './services/firebase.service'

@Component({
  standalone: true,
  imports: [
    IonicModule,
    RouterModule,
    NavigationComponent
  ],
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private firebase = inject(FirebaseService)

  ngOnDestroy() {
    this.firebase.logout()
  }

  ngOnInit() {
    this.firebase.login()
  }
}
