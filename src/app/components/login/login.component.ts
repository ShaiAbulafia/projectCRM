import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // set user variable
  user: User = { email: '', password: '' };
  submitted: boolean = false;

  loginForm: any = FormGroup;

  // inject user service and router
  constructor(
    private us: UsersService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  // login method
  login() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    //True if all the fields are filled
    if (this.submitted) {
      this.us
        .login(this.user)
        .then((data) => {
          sessionStorage.setItem('isLoggedIn', 'true');
          sessionStorage.setItem('email', data.user.email as string);
          alert('Welcome back ' + this.user.email);
          this.router.navigateByUrl('/dashboard/customers/customers-table');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  // login with google method
  loginWithGoogle() {
    this.us
      .loginGoogle()
      .then((data) => {
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('email', data.user.email as string);
        this.router.navigateByUrl('/dashboard/customers/customers-table');
      })
      .catch((err) => console.log(err));
  }
}
