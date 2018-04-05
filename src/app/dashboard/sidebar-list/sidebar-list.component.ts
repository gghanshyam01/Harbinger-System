import { Component, OnInit } from '@angular/core';

import { MapDataShareService } from './../shared/map-data-share.service';

@Component({
  selector: 'app-sidebar-list',
  templateUrl: './sidebar-list.component.html',
  styleUrls: ['./sidebar-list.component.css']
})
export class SidebarListComponent implements OnInit {
  items = [
    'Home',
    'Profile',
    'Messages',
    'Settings'
  ];

  constructor(private mapService: MapDataShareService) { }

  ngOnInit() {
  }

  onItemSelect(item: string) {
    this.mapService.itemSelected(item);
  }

}
