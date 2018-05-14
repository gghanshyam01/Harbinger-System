import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css'
  ]
})
export class AppComponent implements OnInit {
  title = 'Emergency Services for Harbinger System';

  ngOnInit() {
    try {
      firebase.initializeApp(environment.firebaseConfig);
    } catch (e) {
      console.log('Failed to initialize Firebase SDK');
    }
  }

}
