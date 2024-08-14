import {Injectable, OnDestroy} from '@angular/core';
import {Subject, takeUntil, timer} from 'rxjs'
import {Device} from '@capacitor/device'

@Injectable({
  providedIn: 'root'
})
export class BatteryService implements OnDestroy {
  private unsubscribe$ = new Subject<void>()

  private set primaryColor(color: string) {
    const root: HTMLElement | null = document.querySelector(':root')
    if (!root) return
    root.style.setProperty('--bro-color-primary', `#${color}`)
  }

  get primaryColor() {
    const primaryColor = this.getCssVariable('--bro-color-primary')
    return primaryColor ? primaryColor : 'ffffff'
  }

  constructor() {
    timer(0, 30000).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(async () => {
      const batteryInfo = await Device.getBatteryInfo()

      const full = this.getCssVariable('--bro-color-full')
      const medium = this.getCssVariable('--bro-color-medium')
      const low = this.getCssVariable('--bro-color-low')
      const charging = this.getCssVariable('--bro-color-charging')

      if (!full || !medium || !low || !charging || !batteryInfo.batteryLevel || batteryInfo.isCharging === undefined) {
        this.unsubscribe$.next()
        return
      }

      let primaryColor = full

      if (batteryInfo.batteryLevel < .75) primaryColor = medium
      if (batteryInfo.batteryLevel <= .25) primaryColor = low
      if (batteryInfo.isCharging) primaryColor = charging

      this.primaryColor = primaryColor
    })
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
  }

  getCssVariable(variable: string) {
    const root = document.querySelector(':root')
    if (!root) return
    const rootStyle = getComputedStyle(root)

    return rootStyle.getPropertyValue(variable).slice(1)
  }
}
