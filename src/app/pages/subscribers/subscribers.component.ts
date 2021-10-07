import { Component, OnInit } from '@angular/core';
import {GetSubscribersService} from "../../services/get-subscribers.service";
import {MatTableDataSource} from "@angular/material/table";
import {SubscribersFormComponent} from "../subscribers-form/subscribers-form.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.sass']
})
export class SubscribersComponent implements OnInit {
  displayedColumns: string[] = ['Area', 'Name', 'Email', 'CountryName'];
  dataSource = new MatTableDataSource<any>();
  constructor(
    private _getSubscribersService: GetSubscribersService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getSubscribers();
  }
  getSubscribers(): void {
    const params = {
      page: 1,
    }
    this._getSubscribersService.run(params).then((response) => {
      this.dataSource.data = response.Data;
      console.log(response);
    })
  }
  newSubscriber(subscriber = null): void{
    const dialogRef = this.dialog.open(SubscribersFormComponent, {
      panelClass: ['w-full', 'sm:w-120'],
      data: {
        subscriber,
      },
    });
    dialogRef.componentInstance.newRecord.subscribe(() => {
      this.getSubscribers();
    });
  }
}
