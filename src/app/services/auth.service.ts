import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URLs} from '../classes/urls';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth = new Subject<boolean>();
  constructor(private http: HttpClient) { }

  authenticate(authObj) {
    this.isAuth.next(true);
    return this.http.post(URLs.urlLogin, authObj);
  }

  register(authObj) {
    this.isAuth.next(true);
    return this.http.post(URLs.urlRegister, authObj);
  }

  logout() {
    this.isAuth.next(false);
  }

  isAuthCheck() {
    return this.isAuth;
  }

}
