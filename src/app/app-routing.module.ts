import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsTableComponent } from './components/contacts-components/contacts-table/contacts-table.component';
import { ContactsComponent } from './components/contacts-components/contacts/contacts.component';
import { CustomersTableComponent } from './components/customers-components/customers-table/customers-table.component';
import { CustomersComponent } from './components/customers-components/customers/customers.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { NewContactComponent } from './components/contacts-components/new-contact/new-contact.component';
import { NewCustomerComponent } from './components/customers-components/new-customer/new-customer.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { PnfComponent } from './components/pnf/pnf.component';
import { ConstructionComponent } from './components/construction/construction.component';

// set the routes for the app
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'customers',
        component: CustomersComponent,
        children: [
          { path: 'customers-table', component: CustomersTableComponent },
          { path: 'new-customer', component: NewCustomerComponent },
        ],
      },

      {
        path: 'contacts',
        component: ContactsComponent,
        children: [
          { path: 'contacts-table', component: ContactsTableComponent },
          { path: 'new-contact', component: NewContactComponent },
        ],
      },
      { path: 'leads', component: ConstructionComponent },
      { path: 'reports', component: ConstructionComponent },
      { path: 'integrations', component: ConstructionComponent },
      { path: 'year-end-sale', component: ConstructionComponent },
    ],
    canActivate: [AuthGuard],
  },

  { path: '**', component: PnfComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
