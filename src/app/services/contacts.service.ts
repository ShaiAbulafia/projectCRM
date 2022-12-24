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
import { Contact } from '../interfaces/Contact';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  contactsRef = collection(this.firestore, 'contacts');
  constructor(private firestore: Firestore) {}

  // add new contact
  addContact(contact: Contact): Promise<any> {
    return addDoc(this.contactsRef, contact) as Promise<any>;
  }

  // get all contacts from db
  getContacts(): Observable<Contact[]> {
    return collectionData(this.contactsRef, { idField: 'id' }) as Observable<
      Contact[]
    >;
  }

  // update specific contact
  updateContact(newContact: Contact): Promise<any> {
    let contactRef = doc(this.firestore, `contacts/${newContact.id}`);
    return setDoc(contactRef, newContact) as Promise<any>;
  }

  // delete speciifc contact
  deleteContact(contact: Contact): Promise<void> {
    let contactRef = doc(this.firestore, `contacts/${contact.id}`);
    return deleteDoc(contactRef) as Promise<void>;
  }

  // get specific customer
  getCustomerById(id: string): Observable<Contact> {
    let contactRef = doc(this.firestore, `contacts/${id}`);
    return docData(contactRef, { idField: 'id' }) as Observable<Contact>;
  }
}
