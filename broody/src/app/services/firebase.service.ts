import {inject, Injectable} from '@angular/core'
import {AngularFireAuth} from '@angular/fire/compat/auth'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private auth = inject(AngularFireAuth)

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
}
