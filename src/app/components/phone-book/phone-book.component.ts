import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../../services/data.service';
import {MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ApplicationService} from '../../services/application.service';
import {Contact} from '../../classes/contact';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-phone-book',
  templateUrl: './phone-book.component.html',
  styleUrls: ['./phone-book.component.css'],
  animations: [
    trigger('fullInfo', [
      state('open', style({})),
      state('closed', style({height: '0'})),
      transition('closed=>open', [animate('300ms')]),
      transition('open=>closed', [animate('300ms')])
    ])
  ]
})
export class PhoneBookComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort, { static: false } )sort: MatSort;
  @ViewChild(MatPaginator, { static: false } )paginator: MatPaginator;
  isLoading = false;

  markedContactsIds = [];
  markedAll = false;

  dataSubscription: Subscription;
  dataSource = new MatTableDataSource();
  displayedColumns = ['mark', 'lastName', 'name', 'phone'];

  snackBarOption: object = {
    duration: 3000
  };

  firstTime = true;
  expandedRow = null;
  panelOpenState = false;

  constructor(private matSnackBar: MatSnackBar,
              private dataService: DataService,
              private applicationService: ApplicationService,
              private router: Router) { }

  ngOnInit(): void {
    this.refresh();
    this.dataSource.filterPredicate = this.startPredicate;
    this.dataSubscription = this.dataService.dataSubject.subscribe( () => {
      this.isLoading = false;
      this.dataSource.data = this.dataService.getContactArray();
      // if (!this.firstTime) {
      //   this.matSnackBar.open('Data refreshed', null, this.snackBarOption);
      // }
      this.firstTime = false;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
   this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  checkBoxListener(id) {
    if (this.markedContactsIds.includes(id)) {
      this.markedContactsIds.splice(this.markedContactsIds.indexOf(id), 1);
    } else {
      this.markedContactsIds.push(id);
    }
  }

  addContact(id) {
    this.dataService.setContact(null);
    this.router.navigate(['phone-book', 'contact', id]);
  }

  correctContact(id) {
    this.dataService.setContact(
      this.dataSource.data
        .find((contact: any) => contact.id === this.markedContactsIds[0]
    ) as Contact);
    this.router.navigate(['phone-book', 'contact', id]);
  }

  removeContacts() {
    this.applicationService.removeContacts(this.markedContactsIds)
      .subscribe(() => {
        this.markedContactsIds = [];
        this.refresh();
      });
  }
  isMarked(id) {
    return this.markedContactsIds.includes(id);
  }
  refresh() {
    this.isLoading = true;
    this.markedAll = false;
    this.markedContactsIds = [];
    this.applicationService.getAll();
  }

  logout() {
    window.sessionStorage.removeItem('phoneBookToken');
    this.router.navigate(['auth']);
  }

  startPredicate(obj, str) {
    return obj.lastName.toLowerCase().startsWith(str) ||
      obj.name.toLowerCase().startsWith(str) ||
      obj.phone.startsWith(str);
  }

  stopProp(e) {
    e.stopPropagation();
  }

  markAll() {
    this.markedContactsIds = [];
    if (!this.markedAll) {
      for (const obj of this.dataSource.data) {
        this.markedContactsIds.push((obj as Contact).id);
      }
    }
    this.markedAll = !this.markedAll;
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}
