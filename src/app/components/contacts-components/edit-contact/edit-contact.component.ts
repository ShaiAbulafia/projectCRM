import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Contact } from 'src/app/interfaces/Contact';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css'],
})
export class EditContactComponent implements OnInit {
  @Input() id!: string;
  contact: Contact = {
    name: '',
    email: '',
    birthday: '',
    phone: '',
  };
  constructor(
    private contactsService: ContactsService,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.contactsService.getCustomerById(this.id).subscribe({
      next: (contactData: Contact) => (this.contact = contactData),
    });
  }

  updateTheContact() {
    this.contactsService
      .updateContact(this.contact)
      .then(() => this.activeModal.close())
      .catch((err) => console.log(err));
  }
}
