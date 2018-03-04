import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from './../shared/models/user.model';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  URL = 'https://harbinger-system.firebaseio.com/user.json';

  constructor(private http: HttpClient) { }

  signupUser(username: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(username, password);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.URL, user);
  }

}
