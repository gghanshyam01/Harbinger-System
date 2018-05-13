import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../auth/auth.service';
import { Locations } from './location.model';

@Injectable()
export class MapDataShareService {

  item = new Subject<string>();

  constructor(private db: AngularFireDatabase, private authService: AuthService) { }

  itemSelected(newItem: string) {
    this.item.next(newItem);
  }

  getItems() {
    firebase.auth().onAuthStateChanged(user => {
      return this.db.list('/locations').valueChanges();
    });
    return this.db.list<Locations[]>('/locations').snapshotChanges();
  }
}
