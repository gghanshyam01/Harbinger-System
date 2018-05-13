import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MapDataShareService } from './../shared/map-data-share.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-sidebar-list',
  templateUrl: './sidebar-list.component.html',
  styleUrls: ['./sidebar-list.component.css']
})
export class SidebarListComponent implements OnInit, OnDestroy {
  // items = [
  //   'Home',
  //   'Profile',
  //   'Messages',
  //   'Settings'
  // ];

  $itemsSubscription: Subscription;
  items: any;
  constructor(private mapService: MapDataShareService) { }

  ngOnInit() {
    this.$itemsSubscription = this.mapService.getItems().subscribe(next => {
      this.items = next;
    });
  }
  onItemSelect(item: string) {
    this.mapService.itemSelected(item);
  }

  ngOnDestroy() {
    this.$itemsSubscription.unsubscribe();
  }

}
