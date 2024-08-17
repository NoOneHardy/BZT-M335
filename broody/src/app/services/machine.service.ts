import {inject, Injectable, Signal} from '@angular/core'
import {AngularFireDatabase} from '@angular/fire/compat/database'
import {Machine} from '../model/machine'
import {map} from 'rxjs'
import {toSignal} from '@angular/core/rxjs-interop'

@Injectable({
  providedIn: 'root'
})
export class MachineService {
  private database = inject(AngularFireDatabase)

  getMachines(): Signal<Machine[]> {
    return toSignal(this.database.list<Machine>('machines').valueChanges().pipe(
        map(machines => machines.sort((a, b) => {
            return a.name > b.name ? 1 : -1
          })
        )
      ), {
        initialValue: []
      }
    )
  }
}
