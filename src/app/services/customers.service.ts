import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Customer } from '../interfaces/Customer';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  customersRef = collection(this.firestore, 'customers');
  constructor(private firestore: Firestore) {}

  // add new customer
  addCustomer(customer: Customer): Promise<any> {
    return addDoc(this.customersRef, customer) as Promise<any>;
  }

  // get all customers from db
  getCustomers(): Observable<Customer[]> {
    return collectionData(this.customersRef, { idField: 'id' }) as Observable<
      Customer[]
    >;
  }

  // update specific customer
  updateCustomer(newCustomer: Customer): Promise<any> {
    let customerRef = doc(this.firestore, `customers/${newCustomer.id}`);
    return setDoc(customerRef, newCustomer) as Promise<any>;
  }

  // delete speciifc customer
  deleteCustomer(customer: Customer): Promise<void> {
    let customerRef = doc(this.firestore, `customers/${customer.id}`);
    return deleteDoc(customerRef) as Promise<void>;
  }

  // get specific customer
  getCustomerById(id: string): Observable<Customer> {
    let customerRef = doc(this.firestore, `customers/${id}`);
    return docData(customerRef, { idField: 'id' }) as Observable<Customer>;
  }
}
