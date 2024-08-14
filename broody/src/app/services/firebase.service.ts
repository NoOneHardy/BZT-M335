import {inject, Injectable, Signal} from '@angular/core'
import {toSignal} from '@angular/core/rxjs-interop'
import {AngularFireDatabase} from '@angular/fire/compat/database'
import {Plan} from '../data/plan'
import {AngularFireAuth} from '@angular/fire/compat/auth'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private auth = inject(AngularFireAuth)
  private database = inject(AngularFireDatabase)

  login() {
    this.auth.signInAnonymously().then(() => {
      localStorage.setItem('token', 'true')
    })
  }

  logout() {
    this.auth.signOut().then(() => {
      localStorage.removeItem('token')
    })
  }

  getPlans(): Signal<Plan[]> {
    return toSignal(this.database.list<Plan>('plans').valueChanges(), {
      initialValue: []
    })
  }
}
