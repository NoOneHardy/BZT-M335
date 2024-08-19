import {inject, Injectable} from '@angular/core'
import {AngularFireAuth} from '@angular/fire/compat/auth'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private auth = inject(AngularFireAuth)

  private _isOffline = false
  public get isOffline() {
    return this._isOffline
  }

  login() {
    this.auth.signInAnonymously().then(() => {
      localStorage.setItem('token', 'true')
    }).catch(() => {
      this._isOffline = true
    })
  }

  logout() {
    this.auth.signOut().then(() => {
      localStorage.removeItem('token')
    })
  }
}
