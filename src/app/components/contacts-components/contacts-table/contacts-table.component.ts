import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Contact } from 'src/app/interfaces/Contact';
import { ContactsService } from 'src/app/services/contacts.service';
import { EditContactComponent } from '../edit-contact/edit-contact.component';

@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.css'],
})
export class ContactsTableComponent implements OnInit {
  contacts: Contact[] = [];
  name: string = '';
  constructor(
    private contactService: ContactsService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.contactService.getContacts().subscribe({
      next: (contactsData: Contact[]) => {
        this.contacts = contactsData;
      },
    });
  }

  deleteContact(contact: Contact) {
    if (confirm('Are you sure?')) {
      this.contactService
        .deleteContact(contact)
        .then(() => {
          alert('Contact was deleted');
        })
        .catch((err) => console.log(err));
    }
  }

  updateContact(contact: Contact) {
    let modalRef = this.modal.open(EditContactComponent, {
      size: 'lg',
      centered: true,
      windowClass: 'dark-modal',
    });
    modalRef.componentInstance.id = contact.id;
  }
}
