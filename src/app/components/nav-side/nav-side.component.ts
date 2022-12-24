import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomersComponent } from '../customers-components/customers/customers.component';

@Component({
  selector: 'app-nav-side',
  templateUrl: './nav-side.component.html',
  styleUrls: ['./nav-side.component.css'],
})
export class NavSideComponent implements OnInit {
  isCollapsedCustomer: boolean = false;
  isCollapsedContacts: boolean = true;
  email!: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.email = sessionStorage.getItem('email') as string;
  }

  resetCollapsed() {
    this.isCollapsedCustomer = false;
    this.isCollapsedContacts = false;
  }

  recallParentCompCustomer(): void {
    this.isCollapsedCustomer = !this.isCollapsedCustomer;
    this.isCollapsedContacts = true;
    this.router.navigateByUrl('/dashboard/customers/customers-table');
  }

  recallParentCompContacts(): void {
    this.isCollapsedContacts = !this.isCollapsedContacts;
    this.isCollapsedCustomer = true;
    this.router.navigateByUrl('/dashboard/contacts/contacts-table');
  }
}
