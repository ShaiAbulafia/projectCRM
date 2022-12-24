import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'src/app/interfaces/Customer';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css'],
})
export class EditCustomerComponent implements OnInit {
  @Input() id!: string;
  customer: Customer = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    adress: '',
    notes: '',
  };

  constructor(
    private cs: CustomersService,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.cs.getCustomerById(this.id).subscribe({
      next: (customerData: Customer) => (this.customer = customerData),
    });
  }

  updateTheCustomer() {
    this.cs
      .updateCustomer(this.customer)
      .then(() => this.activeModal.close())
      .catch((err) => console.log(err));
  }
}
