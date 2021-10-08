import {Component, OnInit} from '@angular/core';
import {GetSubscribersService} from '../../services/get-subscribers.service';
import {MatTableDataSource} from '@angular/material/table';
import {SubscribersFormComponent} from '../subscribers-form/subscribers-form.component';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {DeleteSubscribersService} from '../../services/delete-subscribers.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.sass'],
})
export class SubscribersComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'Email', 'JobTitle', 'CountryName', 'Actions'];
  dataSource = new MatTableDataSource<any>();
  itemsPerPage: number = 10;
  page: number = 1;
  totalItems: number = 0;

  constructor(
    private _getSubscribersService: GetSubscribersService,
    private _deleteSubscribersService: DeleteSubscribersService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.getSubscribers();
  }

  getSubscribers(): void {
    const params = {
      //criteria: 'search',
      page: this.page,
      count: this.itemsPerPage,
      sortOrder: 'Name',
      sortType: 0
    };
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
