import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataService} from './data.service';
import {URLs} from '../classes/urls';
import {Contact} from '../classes/contact';
import {Observable} from 'rxjs';
import {forkJoin} from 'rxjs/internal/observable/forkJoin';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  snackBarOption: object = {
    duration: 3000
  };

  constructor(private http: HttpClient,
              private dataService: DataService) { }

  getAll() {
    this.http.get(URLs.urlContacts)
      .subscribe((res: any) => {
        this.dataService.setContactArray(res.contacts);
      });
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http.post(URLs.urlAdd, contact) as Observable<Contact>;
  }

  correctContact(contact: Contact): Observable<Contact> {
    return this.http.put(URLs.urlCorrect, contact) as Observable<Contact>;
  }

  removeContacts(contactIds: Array<number>) {
    const requests: Array<Observable<any>> = [];
    contactIds.forEach((id) => {
      requests.push(this.http.delete(URLs.urlRemove + '/' + id));
    });
    return forkJoin(requests);
  }

}
