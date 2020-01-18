import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PhoneBookComponent} from '../../components/phone-book/phone-book.component';
import {ContactComponent} from '../../components/contact/contact.component';
import {PhoneBookGuardService} from '../../services/phone-book-guard.service';
import {AuthComponent} from '../../components/auth/auth.component';

const appRoutes: Routes = [
  // { path: '', component: AppComponent, children: [
  //     { path: 'auth', component: AuthComponent }
  //   ] },
  // { path: 'home', component: AppComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'phone-book', component: PhoneBookComponent, canActivate: [PhoneBookGuardService], children: [
      { path: 'contact/:id', component: ContactComponent }
    ] },
  // { path: '**', redirectTo: 'home' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ]
})
export class RoutingModule { }
