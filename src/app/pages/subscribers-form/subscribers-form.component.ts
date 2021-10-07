import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-subscribers-form',
  templateUrl: './subscribers-form.component.html',
  styleUrls: ['./subscribers-form.component.sass']
})
export class SubscribersFormComponent implements OnInit {
  @Output() newRecord = new EventEmitter();
  form!: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
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
      Topics: ['', [Validators.required]],
    });
  }
  async save(): Promise<void> {

    this.newRecord.emit();
  }
}
