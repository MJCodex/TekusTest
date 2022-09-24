import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { defaultCredentials } from '../../../environments/default-credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  hide = true;
  form!: FormGroup;
  constructor(
    private login_: LoginService,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      UserName: [defaultCredentials.userName, [Validators.required]],
      Password: [defaultCredentials.password, [Validators.required]],
    });
  }

  login(): void {
    if(!this.form.valid){
      return
    }

    this.login_.login(this.form.value);
  }
}
