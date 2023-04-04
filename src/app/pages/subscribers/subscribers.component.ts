import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {GetSubscribersService} from '../../services/get-subscribers.service';
import {MatTableDataSource} from '@angular/material/table';
import {SubscribersFormComponent} from '../../components/subscribers-form/subscribers-form.component';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {DeleteSubscribersService} from '../../services/delete-subscribers.service';
import {MatSort} from '@angular/material/sort';
import {ConfigColumnsModel} from "../../shared/models/config-columns.model";
import {SubscribersApiModel} from "../../shared/models/subscribers-api.model";
import {ApiResponseModel} from "../../shared/models/api-response.model";
import {DynamicTableEventsModel} from "../../shared/models/dynamic-table-events.model";
import {dynamicTableEvents} from "../../shared/components/dynamic-table/dynamic-table.component";

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.sass'],
})
export class SubscribersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Name', 'Email', 'JobTitle', 'CountryName', 'PhoneCodeAndNumber', 'Actions'];
  configColumns: ConfigColumnsModel[] = [
    {
      displayName: 'Name',
      objectKey: 'Name',
      templateColumn: true
    },
    {
      displayName: 'Email',
      objectKey: 'Email',
      templateColumn: true
    },
    {
      displayName: 'JobTitle',
      objectKey: 'JobTitle',
      renderComponent: {
        component: TestComponent,
        properties: {
          message: 'TestComponent',
          index: 1,
          emitter: true
        }
      }
    },
    {
      displayName: 'CountryName',
      objectKey: 'CountryName'
    },
    {
      displayName: 'PhoneCodeAndNumber',
      objectKey: 'PhoneCodeAndNumber',
      renderComponent: {
        component: Test2Component,
        properties: {
          message: 'Test2Component',
          index: 2
        }
      }
    },
    {
      displayName: 'Some',
      objectKey: 'Some.Some',
      rawValue: (row: SubscribersApiModel, objectKey: string): string => {
        return `${row.Activity} custom value`;
      },
    }
  ]
  dataSource = new MatTableDataSource<SubscribersApiModel[]>();
  itemsPerPage: number = 5;
  page: number = 1;
  totalItems: number = 0;
  search: string = '';
  loadingComponent = true;
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

  parentClick(row: any) {
    console.log(row);
    alert('some click from parent');
  }

  getSubscribers(): void {
    const params: any = {
      page: this.page,
      count: this.itemsPerPage,
      sortOrder: 'Name',
      sortType: 0
    };
    this.search ? params.criteria = this.search : '';
    this._getSubscribersService.run(params).then((response: ApiResponseModel<SubscribersApiModel[]>) => {
      this.dataSource.data = response.Data;
      this.totalItems = response.Count;
      this.loadingComponent = false;
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

  eventFromDynamicTable(event: DynamicTableEventsModel): void {
    console.log(event)
  }
}


@Component({
  selector: 'test-component',
  template: `
    <button mat-raised-button (click)="openEditDialog()">click {{index}}</button>
  `,
})
export class TestComponent implements OnInit {
  message: string = 'TestComponent';
  row!: {};
  index!: number;
  @Output() eventEmitter: EventEmitter<DynamicTableEventsModel> = new EventEmitter;

  ngOnInit(): void {
  }

  openEditDialog(): void {
    console.log(this.row);
    const sortEvent: DynamicTableEventsModel = {
      KeyEvent: dynamicTableEvents.Sort,
      Data: undefined
    };
    this.eventEmitter.emit(sortEvent);
  }
}

@Component({
  selector: 'test2-component',
  template: `
    <button mat-mini-fab (click)="openEditDialog()">click {{index}}</button>
  `,
})
export class Test2Component implements OnInit {
  message: string = 'Test2Component';
  row!: {};
  index!: number;

  ngOnInit(): void {
  }

  openEditDialog(): void {
    console.log(this.row);
  }
}
