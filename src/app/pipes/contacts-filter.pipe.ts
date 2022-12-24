import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../interfaces/Contact';

@Pipe({
  name: 'contactsFilter',
})
export class ContactsFilterPipe implements PipeTransform {
  transform(
    contacts: Contact[],
    propName: keyof Contact,
    value: string
  ): Contact[] {
    let filteredContacts: Contact[] = [];
    for (let contact of contacts) {
      if (
        (contact[propName] as string)
          .toLowerCase()
          .includes(value.toLowerCase())
      )
        filteredContacts.push(contact);
    }
    return filteredContacts;
  }
}
