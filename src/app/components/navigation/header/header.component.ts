import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {Subscription} from 'rxjs';
import {PhoneBookGuardService} from '../../../services/phone-book-guard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  @Output() test = new EventEmitter<void>();
  isInside = false;
  authSubscription: Subscription;
  guardSubscription: Subscription;

  constructor(private router: Router,
              private authService: AuthService,
              private guardService: PhoneBookGuardService) { }

  ngOnInit() {
    this.authSubscription = this.authService.isAuth.subscribe(isAuth => {
        this.isInside = isAuth;
        console.log('LOG header: isAuth = ' + isAuth);
    }
    );
    this.guardSubscription = this.guardService.isToken.subscribe(isToken => {
        this.isInside = isToken || this.isInside;
        console.log('LOG header: isToken = ' + isToken);
      }
    );
  }

  go(myPath) {
    this.router.navigate([myPath]);
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onEntrance() {
    if ('phoneBookToken') {
      this.authService.logout();
      window.sessionStorage.removeItem('myToken');
      // window.localStorage.removeItem('myToken');
      this.router.navigate(['auth']);
    } else {
      this.router.navigate(['auth']);
    }

  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
    this.guardSubscription.unsubscribe();
  }
}
