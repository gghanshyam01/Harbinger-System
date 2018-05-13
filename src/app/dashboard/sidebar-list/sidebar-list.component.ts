import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MapDataShareService } from './../shared/map-data-share.service';
import { Subscription } from 'rxjs/Subscription';
import { Locations } from '../shared/location.model';

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

  itemsSubscription$: Subscription;
  items: Locations[] = [];
  constructor(private mapService: MapDataShareService) { }

  ngOnInit() {
    this.itemsSubscription$ = this.mapService.getItems().subscribe(elems => {
      elems.forEach(elem => {
        this.items.push({
          name: elem.key,
          value: elem.payload.val()
        });
      });
    });
  }


  onItemSelect(item: string) {
    this.mapService.itemSelected(item);
  }

  ngOnDestroy() {
    this.itemsSubscription$.unsubscribe();
  }

}
