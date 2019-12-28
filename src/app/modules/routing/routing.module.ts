import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from '../../components/home-page/auth/auth.component';
import {PhoneBookComponent} from '../../components/phone-book/phone-book.component';
import {ContactComponent} from '../../components/contact/contact.component';
import {HomePageComponent} from '../../components/home-page/home-page.component';
import {PhoneBookGuardService} from '../../services/phone-book-guard.service';

const appRoutes: Routes = [
  { path: '', component: HomePageComponent, children: [
      { path: 'auth', component: AuthComponent }
    ] },
  // { path: 'home', component: HomePageComponent },
  { path: 'phone-book', component: PhoneBookComponent, canActivate: [PhoneBookGuardService], children: [
      { path: 'contact/:id', component: ContactComponent }
    ] },
  // { path: '**', redirectTo: 'phone-book' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ]
})
export class RoutingModule { }
