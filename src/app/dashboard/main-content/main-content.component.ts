import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  dir = undefined;

  constructor() { }

  ngOnInit() {
    // this.getCurrLocation();
    this.getDirection();
  }

  getCurrLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.dir.origin.lat = position.coords.latitude;
        this.dir.origin.lng = position.coords.longitude;

      });
    }
  }

  getDirection() {
    this.dir = {
      origin: {lat: 19.413606, lng: 72.828296},
      destination: {lat: 19.384209, lng: 72.828809}
    };
  }
}
