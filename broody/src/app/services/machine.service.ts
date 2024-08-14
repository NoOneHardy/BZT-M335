import {inject, Injectable, Signal} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/compat/database'
import {toSignal} from '@angular/core/rxjs-interop'
import {Machine} from '../data/machine'

@Injectable({
  providedIn: 'root'
})
export class MachineService {
  private database = inject(AngularFireDatabase)

  getMachines(): Signal<Machine[]> {
    return toSignal(this.database.list<Machine>('machines').valueChanges(), {
      initialValue: []
    })
  }
}
