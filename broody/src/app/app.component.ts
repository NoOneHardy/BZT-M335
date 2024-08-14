import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router'
import {FirebaseService} from './services/firebase.service'

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

  ngOnDestroy() {
    this.firebase.logout()
  }

  ngOnInit() {
    this.firebase.login()
  }
}
