import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'src/app/interfaces/Customer';
import { CustomersService } from 'src/app/services/customers.service';
import { EditCustomerComponent } from '../edit-customer/edit-customer.component';
import { ShowCustomerComponent } from '../show-customer/show-customer.component';

@Component({
  selector: 'app-customers-table',
  templateUrl: './customers-table.component.html',
  styleUrls: ['./customers-table.component.css'],
})
export class CustomersTableComponent implements OnInit {
  customers: Customer[] = [];
  firstName: string = '';
  lastName: string = '';
  phone: string = '';

  constructor(private cs: CustomersService, private modal: NgbModal) {}

  ngOnInit(): void {
    this.cs.getCustomers().subscribe({
      next: (customersData: Customer[]) => {
        this.customers = customersData;
      },
    });
  }

  deleteCustomer(customer: Customer) {
    if (confirm('Are you sure?')) {
      this.cs
        .deleteCustomer(customer)
        .then(() => {
          alert('Customer was deleted');
        })
        .catch((err) => console.log(err));
    }
  }

  updateCustomer(customer: Customer) {
    let modalRef = this.modal.open(EditCustomerComponent, {
      size: 'lg',
      centered: true,
      windowClass: 'dark-modal',
    });
    modalRef.componentInstance.id = customer.id;
  }

  showCustomer(customer: Customer) {
    let modalRef = this.modal.open(ShowCustomerComponent, {
      size: 'lg',
      centered: true,
      windowClass: 'dark-modal',
    });
    modalRef.componentInstance.id = customer.id;
  }
}
