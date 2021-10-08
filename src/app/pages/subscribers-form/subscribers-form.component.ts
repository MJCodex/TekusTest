import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CreateOrUpdateSubscribersService} from '../../services/create-or-update-subscribers.service';

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
    private _createOrUpdateSubscribersService: CreateOrUpdateSubscribersService
  ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      Name: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      CountryCode: ['', [Validators.required]],
      CountryName: ['', [Validators.required]],
      PhoneCode: ['', [Validators.required]],
      PhoneNumber: ['', [Validators.required]],
      JobTitle: ['', [Validators.required]],
      Area: ['', [Validators.required]],
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
    console.log(formValue);
    if(!this.form.valid) {
      return
    }
    const data = {
      Subscribers:[
        this.form.value
      ]
    };
    await this._createOrUpdateSubscribersService.run(data, '');
    this.newRecord.emit();
  }
}
