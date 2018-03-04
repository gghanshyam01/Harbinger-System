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
    const config = {
      apiKey: 'AIzaSyAXmZj2C6kSKgrNDLbI7Pjgv3nhl79ADxg',
      authDomain: 'harbinger-system.firebaseapp.com',
      databaseURL: 'https://harbinger-system.firebaseio.com',
      projectId: 'harbinger-system',
      storageBucket: 'harbinger-system.appspot.com',
      messagingSenderId: '361909493447'
    };
    try {
      firebase.initializeApp(config);
    } catch (e) {
      console.log('Failed to initialize Firebase SDK');
    }
  }

}
