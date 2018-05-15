import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { User } from './../shared/models/user.model';

@Injectable()
export class AuthService {
  token: string = null;
  public authState = false;
  constructor() {
  }

  signupUser(user: User): Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(res => this.addUserData(user));
  }

  addUserData(user: User): Promise<any> {
    const uid = firebase.auth().currentUser.uid;
    return firebase.database().ref('users').child(uid).set(user);
  }

  signinUser(email: string, password: string) {
    if (firebase.auth().currentUser !== null) { return; }

    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(res => {
        return firebase.auth().currentUser.getIdToken();
      }).then(token => {
        this.token = token;
        console.log(this.token);
        console.log('reached 2nd then');
        return {
          status: 'alert alert-success',
          msg: 'User log in successful'
        };
      }).catch(err => {
        console.log('reached catch ');
        return {
          status: 'alert alert-warning',
          msg: err.message
        };
      });
  }

  getToken() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user.getIdToken()
          .then(token => this.token = token);
      } else {
        this.token = null;
      }
    });
  }

  logoutUser(): Promise<any> {
    this.token = null;
    this.authState = false;
    return firebase.auth().signOut();
  }

  isLoggedIn() {
    const promise = new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.authState = true;
          resolve(true);
        } else {
          this.authState = false;
          resolve(false);
        }
      });
    });
    return promise;
  }

}
