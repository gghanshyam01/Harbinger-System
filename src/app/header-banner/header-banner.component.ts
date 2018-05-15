import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/Router';
import * as firebase from 'firebase';

import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-header-banner',
  templateUrl: './header-banner.component.html',
  styleUrls: ['./header-banner.component.css']
})
export class HeaderBannerComponent implements OnInit {
  title = 'Quick Vehicle Facilitation System';
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() { }

  onLogoutClick() {
    this.authService.logoutUser().then(val => {
      console.log('User Logged out');
      this.router.navigate(['login']);
    });
  }

  isLoggedIn() {
    return this.authService.isLoggedIn().then((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        return true;
      } else {
        return false;
      }
    });
    // if (firebase.auth().currentUser !== undefined) { return true; } else { return false; }
  }
}
