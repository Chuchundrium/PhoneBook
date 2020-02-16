import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PhoneBookComponent} from '../../components/phone-book/phone-book.component';
import {ContactComponent} from '../../components/contact/contact.component';
import {PhoneBookGuardService} from '../../services/phone-book-guard.service';
import {AuthComponent} from '../../components/auth/auth.component';

const appRoutes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'phone-book', component: PhoneBookComponent, canActivate: [PhoneBookGuardService]},
  { path: 'contact/:id', component: ContactComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ]
})
export class RoutingModule { }
