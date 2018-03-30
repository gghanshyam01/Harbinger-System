import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  status = '';
  message = '';
  loginButton = 'Log In';
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignin(form: NgForm) {
    this.authService.signinUser(form.value.email, form.value.password);
    // console.log('Token',  this.authService.getToken());
  }

}
