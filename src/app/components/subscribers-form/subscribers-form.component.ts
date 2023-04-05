import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CreateOrUpdateSubscribersService} from '../../services/create-or-update-subscribers.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {GetCountriesService} from '../../services/get-countries.service';
import {patterns} from '../../shared/utilities/constants';
import {TranslateService} from '@ngx-translate/core';
import {NotificationsService} from '../../shared/utilities/notifications.service';
import {GetCountryByNameService} from "../../services/get-country-by-name.service";
import {ApiCountriesModel} from "../../shared/models/api-countries.model";
import {debounceTime} from "rxjs/operators";
import {SubscribersApiModel} from "../../shared/models/subscribers-api.model";

@Component({
  selector: 'app-subscribers-form',
  templateUrl: './subscribers-form.component.html',
  styleUrls: ['./subscribers-form.component.sass']
})
export class SubscribersFormComponent implements OnInit {
  @Output() newRecord: EventEmitter<any> = new EventEmitter();
  form!: FormGroup;
  invalidForm: string = 'subscribers-form.error';
  countries: ApiCountriesModel[] = [];
  topics: string[] = ['Orange', 'Apple', 'Watermelon'];

  constructor(
    private _formBuilder: FormBuilder,
    private _createOrUpdateSubscribersService: CreateOrUpdateSubscribersService,
    @Inject(MAT_DIALOG_DATA) public data: { subscriber: SubscribersApiModel },
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService,
    private _getCountriesService: GetCountriesService,
    private _notificationsService: NotificationsService,
    private _getCountryByCodeService: GetCountryByNameService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.form = this._formBuilder.group({
      Id: [this.data?.subscriber?.Id],
      Name: [this.data?.subscriber?.Name, [Validators.pattern(patterns.onlyLetters.pattern), Validators.required]],
      Email: [this.data?.subscriber?.Email, [Validators.pattern(patterns.email.pattern), Validators.required]],
      CountryCode: [{value: this.data?.subscriber?.CountryCode, disabled: true},
        [Validators.pattern(patterns.onlyLetters.pattern), Validators.required, Validators.maxLength(2)]],
      CountryName: [this.data?.subscriber?.CountryName, [Validators.pattern(patterns.onlyLetters.pattern), Validators.required]],
      PhoneCode: [{value: this.data?.subscriber?.PhoneCode, disabled: true},
        [Validators.pattern(patterns.onlyNumbers.pattern), Validators.required]],
      PhoneNumber: [this.data?.subscriber?.PhoneNumber,
        [Validators.pattern(patterns.onlyNumbers.pattern), Validators.required, Validators.minLength(10), Validators.maxLength(15), this.noNegativeNumber]],
      JobTitle: [this.data?.subscriber?.JobTitle, [Validators.pattern(patterns.onlyLetters.pattern), Validators.required, Validators.minLength(15)]],
      Area: [this.data?.subscriber?.Area, [Validators.pattern(patterns.onlyLetters.pattern), Validators.required]],
      Topics: this._formBuilder.array(this.topics.map((topic: string): boolean => this.data?.subscriber?.Topics?.includes(topic))),
      SearchCountry: [this.data?.subscriber?.CountryName, [Validators.required]]
    });

    if (this.data?.subscriber?.CountryName) {
      const [currentCountry]: ApiCountriesModel[] = await this.getCountyByName(this.form.controls.CountryName.value);
      this.form.controls['searchCountry'].setValue(currentCountry);
      this.selectionChange(currentCountry);
    }

    this.listenChangesFormCountries();
  }

  listenChangesFormCountries(): void {
    this.form.controls.searchCountry.valueChanges
      .pipe(
        debounceTime(400)
      )
      .subscribe((searching): void => {
        if (typeof searching === 'string') {
          this.getCountries().then();
        }
      });
  }

  getCountyByName(countryName: string): Promise<ApiCountriesModel[]> {
    const params: { [key: string]: string } = {
      fields: 'name,capital,cca3',
      fullText: 'true'
    };
    return this._getCountryByCodeService.run(params, countryName);
  }

  async save(): Promise<void> {
    if (!this.form.valid) {
      this._notificationsService.alertNotification('errors.Error', this.invalidForm);
      return;
    }

    const formValue: SubscribersApiModel = {
      ...this.form.value,
      Topics: this.form.value.Topics
        .map((state: boolean, index: number): string | boolean => state && this.topics[index])
        .filter((topic: boolean): boolean => topic)
    } as SubscribersApiModel;
    delete formValue.SearchCountry;

    await this._createOrUpdateSubscribersService.run(formValue, this.data?.subscriber?.Id);
    this.newRecord.emit();
  }

  async getCountries(): Promise<void> {
    const searchCountry: string = this.form.controls.searchCountry.value;
    if (!searchCountry) return;
    const paramsObj: { [key: string]: string } = {
      fields: 'name,capital,cca3'
    }
    await this._getCountriesService.run(paramsObj, searchCountry).then((response: ApiCountriesModel[]): void => {
      this.countries = response;
    });
  }

  selectionChange(country: ApiCountriesModel): void {
    this.form.controls['CountryName'].setValue(country.name.common);
    this.form.controls['PhoneCode'].setValue(country.cca3);
    this.form.controls['CountryCode'].setValue(country.cca3);
  }

  displayName(country: ApiCountriesModel): string | null {
    return country ? country?.name?.common : null;
  }

  noNegativeNumber(control: FormControl): { noNegative: boolean } | null {
    let isValid: boolean = true;
    if (control.value < 0) {
      isValid = false;
    }
    return isValid ? null : {noNegative: true};
  }
}
