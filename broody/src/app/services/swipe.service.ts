import { Injectable } from '@angular/core'
import {Subject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SwipeService {
  private swipeCoord?: [number, number]
  private swipeTime?: number
  private _swipeDir$ = new Subject<-1 | 0 | 1>()

  get swipeDir$() {
    return this._swipeDir$.asObservable()
  }

  swipe(e: TouchEvent, when: 'end' | 'start') {
    const coord: [number, number] = [e.changedTouches[0].pageX, e.changedTouches[0].pageY]
    const time = new Date().getTime()

    switch (when) {
      case 'start':
        this.swipeCoord = coord
        this.swipeTime = time
        return
      case 'end':
        if (!this.swipeCoord || !this.swipeTime) {
          this._swipeDir$.next(0)
          return
        }

        const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]]
        const duration = time - this.swipeTime

        if (
          duration < 1000 && Math.abs(direction[0]) > 30
          && Math.abs(direction[0]) > Math.abs(direction[1] * 2)
        ) {
          if (direction[0] < 0) this._swipeDir$.next(-1)
          else if (direction[0] > 0) this._swipeDir$.next(1)
        }
        this._swipeDir$.next(0)
    }
  }
}
