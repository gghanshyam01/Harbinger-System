import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { MapDataShareService } from './../shared/map-data-share.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit, OnDestroy {

  dir = undefined;
  subscription: Subscription;

  constructor(private mapService: MapDataShareService) { }

  ngOnInit() {
    this.getCurrLocation();
    // this.getDirection();
    this.subscription =
      this.mapService.item.subscribe(data => console.log('From Main: ', data));
  }

  getCurrLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.dir = {
          origin: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          destination: {
            lat: 19.384209, lng: 72.828809
          }
        };
        // this.dir.origin.lat = position.coords.latitude;
        // this.dir.origin.lng = position.coords.longitude;
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  getLocation(evt) {
    console.log(evt.coords.lat);
    console.log(evt.coords.lng);
    this.dir.destination = {
      lat: evt.coords.lat,
      lng: evt.coords.lng
    };
  }

  getDirection() {
    this.dir = {
      // origin: {lat: 19.413606, lng: 72.828296},
      destination: {lat: 19.384209, lng: 72.828809}
    };
  }
}
