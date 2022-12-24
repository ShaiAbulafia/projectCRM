import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/interfaces/Customer';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css'],
})
export class NewCustomerComponent implements OnInit {
  customer: Customer = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    adress: '',
    notes: '',
  };
  submitted: boolean = false;
  customerForm: any = FormGroup;
  phoneReg: RegExp =
    /^(?:(?:(\+?972|\(\+?972\)|\+?\(972\))(?:\s|\.|-)?([1-9]\d?))|(0[23489]{1})|(0[57]{1}[0-9]))(?:\s|\.|-)?([^0\D]{1}\d{2}(?:\s|\.|-)?\d{4})$/;

  get f() {
    return this.customerForm.controls;
  }

  constructor(
    private cs: CustomersService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(this.phoneReg)]],
      adress: ['', [Validators.required, Validators.minLength(2)]],
      notes: ['', []],
    });
  }

  addNewCustomer() {
    this.submitted = true;
    if (this.customerForm.invalid) {
      return;
    }
    if (this.submitted) {
      this.cs
        .addCustomer(this.customer)
        .then(() => {
          this.reset();
          alert('Added new customer');
          this.router.navigateByUrl('/dashboard/customers/customers-table');
        })
        .catch((err) => console.log(err));
    }
  }

  reset() {
    this.customer = {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      adress: '',
      notes: '',
    };
  }
}
