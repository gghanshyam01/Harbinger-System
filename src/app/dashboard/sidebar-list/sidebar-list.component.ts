import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-sidebar-list',
  templateUrl: './sidebar-list.component.html',
  styleUrls: ['./sidebar-list.component.css']
})
export class SidebarListComponent implements OnInit {
  selectedItem = new Subject<string>();
  items = [
    'Home',
    'Profile',
    'Messages',
    'Settings'
  ];

  constructor() { }

  ngOnInit() {
  }

  onItemSelect(evt) {
    this.selectedItem.next('hi from Subject');
    console.log(evt);
  }

}
