import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class ViewportService {
  public get isMobile() {
    return window.screen.availWidth < 480
  }

  public get isTablet() {
    return window.screen.availWidth < 900 && !this.isMobile
  }
}
