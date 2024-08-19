import {inject, Injectable} from '@angular/core'
import {AngularFireDatabase} from '@angular/fire/compat/database'
import {Machine} from '../model/machine'
import {map, Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MachineService {
  private database = inject(AngularFireDatabase)

  getMachines(): Observable<Machine[]> {
    return this.database.list<Machine>('machines').valueChanges().pipe(
      map(machines => machines.sort((a, b) => {
          return a.name > b.name ? 1 : -1
        })
      )
    )
  }

  getMachine(id: string): Observable<Machine | null> {
    return this.database.object<Machine>(`machines/${id}`).valueChanges()
  }
}
