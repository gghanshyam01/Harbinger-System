import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/Router';

import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-header-banner',
  templateUrl: './header-banner.component.html',
  styleUrls: ['./header-banner.component.css']
})
export class HeaderBannerComponent implements OnInit {
  title = 'Harbinger System';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() { }

  onLogoutClick() {
    this.authService.logoutUser().then(val => {
      console.log('User Logged out');
      this.router.navigate(['login']);
    });
  }
}
