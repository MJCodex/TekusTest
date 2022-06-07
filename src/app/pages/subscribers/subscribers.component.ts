import {Component, OnInit, ViewChild} from '@angular/core';
import {GetSubscribersService} from '../../services/get-subscribers.service';
import {MatTableDataSource} from '@angular/material/table';
import {SubscribersFormComponent} from '../../components/subscribers-form/subscribers-form.component';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {DeleteSubscribersService} from '../../services/delete-subscribers.service';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.sass'],
})
export class SubscribersComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'Email', 'JobTitle', 'CountryName', 'PhoneCodeAndNumber', 'Actions'];
  dataSource = new MatTableDataSource<any>();
  itemsPerPage: number = 5;
  page: number = 1;
  totalItems: number = 0;
  search: string = '';
  @ViewChild(MatSort) sort: MatSort | any;

  constructor(
    private _getSubscribersService: GetSubscribersService,
    private _deleteSubscribersService: DeleteSubscribersService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.getSubscribers();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getSubscribers(): void {
    const params: any = {
      page: this.page,
      count: this.itemsPerPage,
      sortOrder: 'Name',
      sortType: 0
    };
    this.search ? params.criteria = this.search : '';
    this._getSubscribersService.run(params).then((response) => {
      this.dataSource.data = response.Data;
      this.totalItems = response.Count;
    });
  }

  newSubscriber(subscriber = null): void {
    const dialogRef = this.dialog.open(SubscribersFormComponent, {
      panelClass: ['w-full', 'sm:w-120'],
      data: {
        subscriber,
      },
    });
    dialogRef.componentInstance.newRecord.subscribe(() => {
      this.dialog.closeAll()
      this.getSubscribers();
    });
  }

  confirmDelete(data: any): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: null,
      })
      .afterClosed()
      .subscribe(async (confirmed: Boolean) => {
        if (confirmed) {
          await this._deleteSubscribersService.run(data.Id);
          await this.getSubscribers();
        }
      });
  }

  changePaginator(data: any): void {
    this.itemsPerPage = data.pageSize;
    this.page = data.pageIndex + 1;
    this.getSubscribers();
  }
}
