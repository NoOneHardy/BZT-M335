import { Component, OnInit } from '@angular/core';
import {NavigationItemComponent} from './navigation-item/navigation-item.component'

@Component({
  standalone: true,
  imports: [
    NavigationItemComponent
  ],
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
