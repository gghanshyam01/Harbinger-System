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
  infoWindow: google.maps.InfoWindow;

  @ViewChild('mapContent') mapElement: ElementRef;
  @ViewChild('directionsPanel') panelElement: ElementRef;

  constructor(private mapService: MapDataShareService) { }

  ngOnInit() {
    this.showMap();
    this.subscription = this.mapService.item
      .subscribe(data => console.log('From Main: ', data));
  }

  showMap() {
    this.trafficLayer = new google.maps.TrafficLayer();
    this.directionsDisplay = new google.maps.DirectionsRenderer({
      suppressPolylines: true,
      infoWindow: this.infoWindow
    });
    this.directionsService = new google.maps.DirectionsService();
    this.infoWindow = new google.maps.InfoWindow();

    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 13,
      center: {
        lat: 19.384209,
        lng: 72.828809
      }
    });

    this.trafficLayer.setMap(this.map);
    this.directionsDisplay.setPanel(this.panelElement.nativeElement);

    const request: google.maps.DirectionsRequest = {
      origin: 'Nalasopara, Mumbai',
      destination: 'Marine Drive, Mumbai',
      travelMode: google.maps.TravelMode.DRIVING
    };

    this.directionsService.route(request,
      (result: google.maps.DirectionsResult, status: google.maps.DirectionsStatus) => {
      if (status === google.maps.DirectionsStatus.OK) {
        console.log(result);
        this.plotCustomPath(result);
        this.directionsDisplay.setDirections(result);
        this.directionsDisplay.setMap(this.map);
      }
    });
  }

  plotCustomPath(result: google.maps.DirectionsResult) {
    // const marker: google.maps.Marker = ; // = new google.maps.Marker();
    const legs: google.maps.DirectionsLeg[] = result.routes[0].legs;
    legs.forEach(leg => {
      const steps: google.maps.DirectionsStep[] = leg.steps;
      steps.forEach(step => {
        const nextSegments = step.path;
        const stepPolyline = new google.maps.Polyline({
          strokeOpacity: 0.5,
          strokeWeight: 4
        });
        nextSegments.forEach(nextSegment => {
          stepPolyline.getPath().push(nextSegment);
        });
        stepPolyline.setMap(this.map);
        google.maps.event.addListener(stepPolyline, 'click', (event) => {
          const marker = new google.maps.Marker({
            animation: google.maps.Animation.DROP,
            map: this.map,
            icon: './assets/call-center-worker-with-headset-blue.png',
            position: event.latLng,
            title: 'Route divided at: ' + event.latLng.toUrlValue(6)
          });
          marker.addListener('click', () => {
            marker.setMap(null);
          });
          // this.infoWindow.setPosition(event.latLng);
          // this.infoWindow.open(this.map);
        });
      });
    });

  }

  // getCurrLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.dir = {
  //         source: {
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude
  //         },
  //         destination: {
  //           lat: 19.384209,
  //           lng: 72.828809
  //         }
  //       };
  //     });
  //   }
  // }

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
