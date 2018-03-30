import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { User } from './../shared/models/user.model';

@Injectable()
export class AuthService {
  token: string;
  constructor() {
  }

  signupUser(user: User): Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then((res) => {
      return this.addUserData(user);
    });
  }

  addUserData(user: User): Promise<any> {
    const uid = firebase.auth().currentUser.uid;
    return firebase.database().ref('users').child(uid).set(user);
  }

  signinUser(email: string, password: string) {
    if (this.token !== undefined) { return console.log('Already Logged In'); }
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(res => firebase.auth().currentUser.getIdToken())
      .then(token => {
        this.token = token;
        console.log('Token', this.token);
      });
  }

  getToken(): string {
    firebase.auth().currentUser.getIdToken()
      .then(token => this.token = token);
    return this.token;
  }

}
