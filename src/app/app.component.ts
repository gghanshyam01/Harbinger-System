import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css'
  ]
})
export class AppComponent implements OnInit {
  title = 'Harbinger System';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAXmZj2C6kSKgrNDLbI7Pjgv3nhl79ADxg',
      authDomain: 'harbinger-system.firebaseapp.com'
    });
  }

}
