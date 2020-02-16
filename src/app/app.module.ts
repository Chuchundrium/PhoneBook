import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {AuthComponent} from './components/auth/auth.component';
import {PhoneBookComponent} from './components/phone-book/phone-book.component';
import {HomePageComponent} from './components/home-page/home-page.component';
import {ContactComponent} from './components/contact/contact.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {RoutingModule} from './modules/routing/routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoadingSpinnerComponent} from './components/loading-spinner/loading-spinner.component';
import {PhoneBookInterceptor} from './classes/phone-book-interceptor';
import {AuthService} from './services/auth.service';
import {ApplicationService} from './services/application.service';
import {DataService} from './services/data.service';
import {PhoneBookGuardService} from './services/phone-book-guard.service';
import {MaterialAngularModule} from './modules/material-angular/material-angular.module';
import {HeaderComponent} from './components/navigation/header/header.component';
import {ExtendedModule, FlexModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    PhoneBookComponent,
    HomePageComponent,
    ContactComponent,
    LoadingSpinnerComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    RoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialAngularModule,
    ExtendedModule,
    FlexModule,
  ],
  providers: [AuthService,
    ApplicationService,
    DataService,
    PhoneBookGuardService,
    { provide: HTTP_INTERCEPTORS,
    useClass: PhoneBookInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
