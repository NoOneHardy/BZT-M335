import { Component, OnInit } from '@angular/core';
import {NavigationComponent} from '../navigation/navigation.component'

@Component({
  standalone: true,
  imports: [
    NavigationComponent
  ],
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
