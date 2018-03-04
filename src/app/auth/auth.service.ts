import { Injectable } from '@angular/core';

import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  constructor() { }

  signupUser(username: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(username, password)
      .catch(error => console.log(error));
  }
}
