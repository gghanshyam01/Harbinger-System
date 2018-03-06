import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

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
  constructor(private authService: AuthService) {
    // this.message = '';
  }
  
  ngOnInit() {
  }

  onSignup(form: NgForm) {
    if (form.value.password !== form.value.confirmPassword) {
      return;
    }
    try {
      const email: string = form.value.email;
      const password: string = form.value.password;
      this.user = {
        name: {
          firstName: form.value.firstName,
          lastName: form.value.lastName
        },
        username: form.value.username,
        email,
        password
      };
      console.log(this.user);
      this.authService.signupUser(email, password)
        .then((res) => {
          this.authService.createUser(this.user)
            .subscribe(() => {
              console.log(this.user);
            }, (err) => {
              throw new Error(err);
            });
          this.status = 'alert alert-success';
          this.message = 'User created successfully.';
        }).catch((err) => {
          console.log(err.message);
          this.status = 'alert alert-warning';
          this.message = err.message;
        });
    } catch (err) {
      // console.log('Some error occurred.');
      this.status = 'alert alert-danger';
      this.message = 'Some error occurred.';
    } finally {
      form.reset();
    }
  }
}
