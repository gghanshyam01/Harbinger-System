import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from './../auth.service';
import { Router } from '@angular/Router';
import { HeaderBannerComponent } from '../../header-banner/header-banner.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  status = '';
  message = '';
  loginButton = 'Log In';
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSignin(form: NgForm) {
    this.loginButton = 'Logging In...';
    try {
      this.authService.signinUser(form.value.email, form.value.password).then(res => {
        form.reset();
        this.status = res.status;
        this.message = res.msg;
        this.router.navigate(['dashboard']);
      });
    } catch (err) {
      console.log('Already Logged In', err);
      this.router.navigate(['dashboard']);
    }
    this.loginButton = 'Log In';
  }

}
