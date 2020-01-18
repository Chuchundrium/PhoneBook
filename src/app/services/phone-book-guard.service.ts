import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhoneBookGuardService implements CanActivate {
  isToken = new Subject<boolean>();
  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (window.sessionStorage.getItem('phoneBookToken')) {
    // if (window.localStorage.getItem('phoneBookToken')) {
      this.isToken.next(true);
      return true;
    } else {
      this.router.navigate(['auth']);
      this.isToken.next(false);
      return false;
    }
  }
}
