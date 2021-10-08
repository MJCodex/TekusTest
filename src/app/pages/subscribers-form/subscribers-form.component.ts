import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CreateOrUpdateSubscribersService} from '../../services/create-or-update-subscribers.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-subscribers-form',
  templateUrl: './subscribers-form.component.html',
  styleUrls: ['./subscribers-form.component.sass']
})
export class SubscribersFormComponent implements OnInit {
  @Output() newRecord = new EventEmitter();
  form!: FormGroup;
  topics = [{
    name: 'CSS',
    value: '1'
  }, {
    name: 'HTML',
    value: '2'
  }];
  constructor(
    private _formBuilder: FormBuilder,
    private _createOrUpdateSubscribersService: CreateOrUpdateSubscribersService,
    @Inject(MAT_DIALOG_DATA) public data: { subscriber: any },
  ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      Id: [this.data?.subscriber?.Id],
      Name: [this.data?.subscriber?.Name, [Validators.required]],
      Email: [this.data?.subscriber?.Email, [Validators.required]],
      CountryCode: [this.data?.subscriber?.CountryCode, [Validators.required]],
      CountryName: [this.data?.subscriber?.CountryName, [Validators.required]],
      PhoneCode: [this.data?.subscriber?.PhoneCode, [Validators.required]],
      PhoneNumber: [this.data?.subscriber?.PhoneNumber, [Validators.required]],
      JobTitle: [this.data?.subscriber?.JobTitle, [Validators.required]],
      Area: [this.data?.subscriber?.Area, [Validators.required]],
      Topics: this._formBuilder.array(this.topics.map(x => false))
    });
  }
  async save(): Promise<void> {
    const formValue = {
      ...this.form.value,
      Topics: this.form.value.Topics
        .map((checked: any, i: number) => checked ? this.topics[i].value : null)
        .filter((v: null) => v !== null),
    }
    if(!this.form.valid) {
      return
    }
    const data = {
      Subscribers:[
        formValue
      ]
    };
    await this._createOrUpdateSubscribersService.run(data, this.data?.subscriber?.Id);
    this.newRecord.emit();
  }
}
