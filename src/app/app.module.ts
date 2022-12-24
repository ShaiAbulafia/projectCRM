import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavTopComponent } from './components/nav-top/nav-top.component';
import { NavSideComponent } from './components/nav-side/nav-side.component';
import { CustomersTableComponent } from './components/customers-components/customers-table/customers-table.component';
import { ContactsTableComponent } from './components/contacts-components/contacts-table/contacts-table.component';
import { NewCustomerComponent } from './components/customers-components/new-customer/new-customer.component';
import { CustomersComponent } from './components/customers-components/customers/customers.component';
import { CustomerFilerPipe } from './pipes/customer-filer.pipe';
import { EditCustomerComponent } from './components/customers-components/edit-customer/edit-customer.component';
import { ShowCustomerComponent } from './components/customers-components/show-customer/show-customer.component';
import { ContactsFilterPipe } from './pipes/contacts-filter.pipe';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ContactsComponent } from './components/contacts-components/contacts/contacts.component';
import { NewContactComponent } from './components/contacts-components/new-contact/new-contact.component';
import { EditContactComponent } from './components/contacts-components/edit-contact/edit-contact.component';
import { PnfComponent } from './components/pnf/pnf.component';
import { ConstructionComponent } from './components/construction/construction.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavTopComponent,
    NavSideComponent,
    CustomersTableComponent,
    ContactsTableComponent,
    NewCustomerComponent,
    CustomersComponent,
    CustomerFilerPipe,
    EditCustomerComponent,
    ShowCustomerComponent,
    ContactsFilterPipe,
    DashboardComponent,
    ContactsComponent,
    NewContactComponent,
    EditContactComponent,
    PnfComponent,
    ConstructionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
