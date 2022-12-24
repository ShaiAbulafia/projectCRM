import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-nav-top',
  templateUrl: './nav-top.component.html',
  styleUrls: ['./nav-top.component.css'],
})
export class NavTopComponent implements OnInit {
  // injext user service and router for logout
  constructor(private us: UsersService, private router: Router) {}

  // save user email for display
  ngOnInit(): void {}

  // logout method
  logOut() {
    this.us
      .logOut()
      .then(() => {
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('isLoggedIn');
        this.router.navigateByUrl('/login');
      })
      .catch((err) => console.log(err));
  }
}
