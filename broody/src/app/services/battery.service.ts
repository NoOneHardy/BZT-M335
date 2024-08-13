import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BatteryService {
  get systemColor() {
    return '1cd808'
  }
}
