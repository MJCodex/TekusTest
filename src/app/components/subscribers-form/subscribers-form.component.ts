import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CreateOrUpdateSubscribersService} from '../../services/create-or-update-subscribers.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslocoService} from '@ngneat/transloco';
import {GetCountriesService} from '../../services/get-countries.service';

@Component({
    selector: 'app-subscribers-form',
    templateUrl: './subscribers-form.component.html',
    styleUrls: ['./subscribers-form.component.sass'],
})
export class SubscribersFormComponent implements OnInit {
    @Output() newRecord = new EventEmitter();
    form!: FormGroup;
    invalidForm = 'subscribers-form.error';
    countries: any = [];
    topics = [{
        name: 'CSS',
        value: '1',
    }, {
        name: 'HTML',
        value: '2',
    }];

    constructor(
        private _formBuilder: FormBuilder,
        private _createOrUpdateSubscribersService: CreateOrUpdateSubscribersService,
        @Inject(MAT_DIALOG_DATA) public data: { subscriber: any },
        private _snackBar: MatSnackBar,
        private _translocoService: TranslocoService,
        private _getCountriesService: GetCountriesService,
    ) {
    }

    async ngOnInit(): Promise<void> {
        this.form = this._formBuilder.group({
            Id: [this.data?.subscriber?.Id],
            Name: [this.data?.subscriber?.Name, [Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$'), Validators.required]],
            Email: [this.data?.subscriber?.Email, [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.required]],
            CountryCode: [this.data?.subscriber?.CountryCode, [Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$'), Validators.required, Validators.maxLength(2)]],
            CountryName: [this.data?.subscriber?.CountryName, [Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$'), Validators.required]],
            PhoneCode: [this.data?.subscriber?.PhoneCode, [Validators.pattern('^[0-9 ]*$'), Validators.required]],
            PhoneNumber: [this.data?.subscriber?.PhoneNumber, [Validators.pattern('^[0-9]*$'), Validators.required, Validators.minLength(10)]],
            JobTitle: [this.data?.subscriber?.JobTitle, [Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$'), Validators.required, Validators.minLength(15)]],
            Area: [this.data?.subscriber?.Area, [Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$'), Validators.required]],
            Topics: this._formBuilder.array(this.topics.map(item => false)),
            searchCountry: [this.data?.subscriber?.CountryName, [Validators.required]],
        });
        if(this.data?.subscriber?.CountryName){
            await this.getCountries();
            this.form.controls['searchCountry'].setValue(this.countries[0]);
        }
    }

    async save(): Promise<void> {
        const formValue = {
            ...this.form.value,
            Topics: this.form.value.Topics
                .map((checked: any, i: number) => checked ? this.topics[i].value : null)
                .filter((v: null) => v !== null),
        };
        if (!this.form.valid) {
            this._snackBar.open(this._translocoService.translate(this.invalidForm), '',
                {
                    duration: 1500,
                });
            return;
        }
        const data = {
            Subscribers: [
                formValue,
            ],
        };
        await this._createOrUpdateSubscribersService.run(this.data?.subscriber?.Id ? formValue : data, this.data?.subscriber?.Id);
        this.newRecord.emit();
    }

    async getCountries(): Promise<void> {
        const params = {
            criteria: this.form.controls.searchCountry.value,
        };
        await this._getCountriesService.run(params).then((response) => {
            this.countries = response.Data;
        });
    }

    selectionChange(item: any): void {
        this.form.controls['CountryName'].setValue(item.option.value.Name);
        this.form.controls['PhoneCode'].setValue(item.option.value.PhoneCode.trim());
        this.form.controls['CountryCode'].setValue(item.option.value.Code.trim());
    }

    displayName(value: any): any {
        if (!value) {
            return null;
        }
        return value.Name;
    }
}
