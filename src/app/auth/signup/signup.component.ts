import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/Router';

import { AuthService } from './../auth.service';
import { User } from './../../shared/models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  message: string;
  status: string;
  user: User;
  registerButton = 'Register';
  constructor(private authService: AuthService, private router: Router) {  }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    if (form.value.password !== form.value.confirmPassword) { return; }
    try {
      this.user = {
        name: {
          firstName: form.value.firstName,
          lastName: form.value.lastName
        },
        username: form.value.username,
        email: form.value.email,
        password: form.value.password
      };
      this.registerButton = 'Registering...';
      this.authService.signupUser(this.user).then((res) => {
        this.status = 'alert alert-success';
        this.message = 'User account created successfully';
        form.reset();
        this.registerButton = 'Register';
        this.router.navigate(['/login']);
      }).catch((err) => {
        console.log(err);
        this.status = 'alert alert-warning';
        this.message = err.message;
        form.reset();
        this.registerButton = 'Register';
      });
    } catch (err) {
      console.log(err);
      this.status = 'alert alert-danger';
      this.message = 'Some error occurred.';
      this.registerButton = 'Register';
    }
  }
}
