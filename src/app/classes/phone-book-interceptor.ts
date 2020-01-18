import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MatSnackBar} from '@angular/material';
import {Injectable} from '@angular/core';

@Injectable()
export class PhoneBookInterceptor implements HttpInterceptor {
  snackBarOption: object = {
    duration: 3000
  };
  constructor(private matSnackBar: MatSnackBar) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = window.sessionStorage.getItem('phoneBookToken');
    // const token: string = window.localStorage.getItem('phoneBookToken');
    const headerObj: any = {'Content-Type': 'application/json'};
    if (token) {headerObj.Authorization = token; }
    const cloned = req.clone({
      setHeaders: headerObj
    });
    return next.handle(cloned);
    // return next.handle(cloned).pipe(tap({
    //   next: res => {
    //     console.log('success');
    //     return event; },
    //   error: err => {
    //     this.matSnackBar.open(err.error.message,null, this.snackBarOption);
    //     // switch (err.status) {
    //     //   case 400:
    //     //     this.matSnackBar.open(
    //     //       'Wrong data format: ' + err.error.message,
    //     //       null, this.snackBarOption);
    //     //     break;
    //     //   case 401:
    //     //     this.matSnackBar.open(
    //     //       'Authentication failed or JWT token expired',
    //     //       null, this.snackBarOption);
    //     //     break;
    //     // }
    //     return err;
    //   }
    // }));
  }

}
