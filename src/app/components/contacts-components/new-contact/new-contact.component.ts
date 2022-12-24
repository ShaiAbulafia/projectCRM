import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from 'src/app/interfaces/Contact';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.css'],
})
export class NewContactComponent implements OnInit {
  contact: Contact = {
    name: '',
    email: '',
    birthday: '',
    phone: '',
  };
  submitted: boolean = false;
  contactForm: any = FormGroup;
  phoneReg: RegExp =
    /^(?:(?:(\+?972|\(\+?972\)|\+?\(972\))(?:\s|\.|-)?([1-9]\d?))|(0[23489]{1})|(0[57]{1}[0-9]))(?:\s|\.|-)?([^0\D]{1}\d{2}(?:\s|\.|-)?\d{4})$/;

  constructor(
    private contactsService: ContactsService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  get f() {
    return this.contactForm.controls;
  }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      birthday: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(this.phoneReg)]],
      imgUrl: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  addNewContact() {
    this.submitted = true;
    if (this.contactForm.invalid) {
      return;
    }
    if (this.submitted) {
      this.contactsService
        .addContact(this.contact)
        .then(() => {
          this.reset();
          alert('Added new contacts');
          this.router.navigateByUrl('/dashboard/contacts/contacts-table');
        })
        .catch((err) => console.log(err));
    }
  }

  reset() {
    this.contact = {
      name: '',
      email: '',
      birthday: '',
      phone: '',
    };
  }
}
