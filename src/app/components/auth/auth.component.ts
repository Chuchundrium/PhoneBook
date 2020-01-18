import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {FormControl, FormGroup} from '@angular/forms';
import {ErrorMatcher} from '../../classes/error-matcher';
import {AuthService} from '../../services/auth.service';
import {Patterns} from '../../classes/patterns';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {ApplicationService} from '../../services/application.service';
import {DataService} from '../../services/data.service';
import {HomePageComponent} from '../home-page/home-page.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild(HomePageComponent, {static: true} ) homePageComponent: HomePageComponent;
  myLogin = 'ievgen1@gmail.com';
  myPassword = 'Password123$';
  isLoading = false;
  error = null;
  authObservable: Observable<any>;
  authSubscription: Subscription;

  snackBarOption: object = {
    duration: 3000
  };
  matcher = new ErrorMatcher();
  // loginFC = new FormControl('', Patterns.emailPattern);
  // passwordFC = new FormControl('', Patterns.passwordPattern);
  loginFC = new FormControl(this.myLogin, Patterns.emailPattern);
  passwordFC = new FormControl(this.myPassword, Patterns.passwordPattern);
  authFG = new FormGroup({
    email: this.loginFC,
    password: this.passwordFC
  });
  hide = true;

  constructor(private matSnackBar: MatSnackBar,
              private authService: AuthService,
              private applicationService: ApplicationService,
              private dataService: DataService,
              private router: Router) {  }

  ngOnInit() {
  }

  sendAuthInfo(mode) {

    if (this.authFG.invalid) {
      this.matSnackBar.open('Wrong auth data', null, this.snackBarOption);
      return;
    }

    this.isLoading = true;

    this.authObservable =
      mode === 'signUp' ?
        this.authService.register(this.authFG.value) :
        this.authService.authenticate(this.authFG.value);
    this.authSubscription = this.authObservable.subscribe((res) => {
          window.sessionStorage.setItem('phoneBookToken', res.token);
          // window.localStorage.setItem('phoneBookToken', res.token);
          this.matSnackBar.open('Access allowed', null, this.snackBarOption);
          this.applicationService.getAll();
          this.router.navigate(['phone-book']);
        }
      );
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

}
