import { Router } from '@angular/router';
import { AlertifyService } from './../../services/alertify.service';
import { AuthService } from './../../services/auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private auth:AuthService,
              private alertify:AlertifyService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(loginForm: NgForm) {
    const user = this.auth.authUser(loginForm.value);
    if (user) {
      localStorage.setItem('token', user.userName);
      this.alertify.success("Login Successfully!");
      this.router.navigate(['/']);
    } else {
      this.alertify.error("User Name or Password not correct!");
    }
  }
}
