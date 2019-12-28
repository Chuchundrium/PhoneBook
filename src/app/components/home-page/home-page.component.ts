import {Component, forwardRef, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthComponent} from './auth/auth.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  private authComponent: AuthComponent;
  isAuthOpen = false;

  constructor(private router: Router,
              // @Inject(forwardRef(() => AuthComponent))
              //   authComponent: AuthComponent
  ) {
    // this.authComponent = authComponent;
  }

  ngOnInit() {
  }
  go(myPath) {
    this.router.navigate([myPath]);
    this.isAuthOpen = true;
  }

  setSignInInvisible(isVisible: boolean): void {
    // this.
  }
}
