import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import {  } from '@types/googlemaps';
import { Subscription } from 'rxjs/Subscription';

import { MapDataShareService } from './../shared/map-data-share.service';
import { Direction } from '../shared/direction.model';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit, OnDestroy {

  dir: Direction;
  subscription: Subscription;

  map: google.maps.Map;
  trafficLayer: google.maps.TrafficLayer;
  directionsDisplay: google.maps.DirectionsRenderer;
  directionsService: google.maps.DirectionsService;
  marker: google.maps.Marker;

  @ViewChild('mapContent') mapElement: ElementRef;
  @ViewChild('directionsPanel') panelElement: ElementRef;

  constructor(private mapService: MapDataShareService) { }

  ngOnInit() {
    this.getCurrLocation();
    this.subscription = this.mapService.item
      .subscribe(data => console.log('From Main: ', data));
  }

  showMap(dir: Direction) {
    this.trafficLayer = new google.maps.TrafficLayer();
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.directionsService = new google.maps.DirectionsService();

    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 13,
      center: {
        lat: 19.384209,
        lng: 72.828809
      }
    });
    google.maps.event.addListener(this.map, 'click', (event) => {
      this.onMapClick(event);
    });
    this.trafficLayer.setMap(this.map);
    this.directionsDisplay.setPanel(this.panelElement.nativeElement);

    const request: google.maps.DirectionsRequest = {
      origin: 'Nalasopara, Mumbai',
      destination: 'Marine Drive, Mumbai',
      travelMode: google.maps.TravelMode.DRIVING
    };

    this.directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(result);
        this.directionsDisplay.setMap(this.map);
      }
    });
  }

  getCurrLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.dir = {
          source: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          destination: {
            lat: 19.384209,
            lng: 72.828809
          }
        };
        this.showMap(this.dir);
      });
    }
  }

  onMapClick(evt) {
    console.log(evt.latLng.lat());
    console.log(evt.latLng.lng());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // getLocation(evt) {
  //   console.log(evt.coords.lat);
  //   console.log(evt.coords.lng);
  //   this.dir.destination = {
  //     lat: evt.coords.lat,
  //     lng: evt.coords.lng
  //   };
  // }

}
