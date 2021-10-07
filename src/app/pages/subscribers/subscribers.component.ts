import { Component, OnInit } from '@angular/core';
import {GetSubscribersService} from "../../services/get-subscribers.service";

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.sass']
})
export class SubscribersComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = null;
  constructor(
    private _getSubscribersService: GetSubscribersService
  ) { }

  ngOnInit(): void {
    this.getSubscribers();
  }
  getSubscribers(): void {
    const params = {
      page: 1,
    }
    this._getSubscribersService.run(params).then((response) => {
      console.log(response);
    })
  }
}
