import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: User = { email: '', password: '' };
  submitted: boolean = false;

  registerForm: any = FormGroup;

  constructor(
    private us: UsersService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  get f() {
    return this.registerForm.controls;
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  register() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    if (this.submitted) {
      this.us
        .register(this.user)
        .then((data) => {
          sessionStorage.setItem('isLoggedIn', 'true');
          sessionStorage.setItem('email', data.user.email as string);
          alert('Welcome ' + this.user.email);
          this.router.navigateByUrl('/dashboard/customers/customers-table');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}
