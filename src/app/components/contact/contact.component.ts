import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Observable, Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Patterns} from '../../classes/patterns';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorMatcher} from '../../classes/error-matcher';
import {Contact} from '../../classes/contact';
import {ApplicationService} from '../../services/application.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnDestroy {
  snackBarOption: object = {
    duration: 3000
  };

  correctObservable: Observable<Contact>;
  correctSubscription: Subscription;
  contactSubscription: Subscription;
  dataSubscription: Subscription;

  contact: Contact;
  addressFC: FormControl;
  descriptionFC: FormControl;
  emailFC: FormControl;
  lastNameFC: FormControl;
  nameFC: FormControl;
  phoneFC: FormControl;
  contactFG: FormGroup;
  matcher: ErrorMatcher = new ErrorMatcher();
  mode: string;
  private id: number;

  constructor(private dataService: DataService,
              private applicationService: ApplicationService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    // this.id = activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {

    this.activatedRoute.paramMap.pipe(
      switchMap(params => params.get('id'))
    )
      .subscribe(data => this.id = +data);

    this.contactSubscription = this.dataService.contactSubject.subscribe(() => {
      this.contact = this.dataService.getContact();
      this.mode = this.contact ? 'correct' : 'add';
      if (!this.contact) {
        this.contact = Contact.getEmptyContact();
      }

      this.addressFC = new FormControl(this.contact.address,
                          [Validators.required, Patterns.addressPattern]);
      this.descriptionFC = new FormControl(this.contact.description);
      this.emailFC = new FormControl(this.contact.email,
        [Validators.required, Patterns.emailPattern]);
      this.lastNameFC = new FormControl(this.contact.lastName,
        [Validators.required, Patterns.namePattern]);
      this.nameFC = new FormControl(this.contact.name,
        [Validators.required, Patterns.namePattern]);
      this.phoneFC = new FormControl(this.contact.phone,
        [Validators.required, Patterns.phonePattern]);
      this.contactFG = new FormGroup({
        address: this.addressFC,
        description: this.descriptionFC,
        email: this.emailFC,
        lastName: this.lastNameFC,
        name: this.nameFC,
        phone: this.phoneFC
      });
    });
  }

  cancel() {
    this.router.navigate(['phone-book']);
  }

  contactSubmit() {
    if (this.contactFG.invalid) { return; }
    const contactToSend = this.contactFG.value;
    contactToSend.id = this.mode === 'add' ? 0 : this.contact.id;
    this.correctObservable = this.mode === 'add' ?
      this.applicationService.addContact(contactToSend) :
      this.applicationService.correctContact(contactToSend);
    this.correctSubscription = this.correctObservable.subscribe((res) => {
      console.log(res);
      this.applicationService.getAll();
      this.dataSubscription = this.dataService.dataSubject.subscribe(() => {
          this.router.navigate(['phone-book']);
        },
        (err) => console.log(err));
    });
  }

  ngOnDestroy(): void {
    if (this.contactSubscription) {
      this.contactSubscription.unsubscribe();
    }
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
    if (this.correctSubscription) {
      this.correctSubscription.unsubscribe();
    }
  }
}
