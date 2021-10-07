import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../services/login.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

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
    private _snackBar: MatSnackBar,
    private _router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      UserName: ['', [Validators.required]],
      Password: ['', [Validators.required]],
    });
  }

  login(): void {
    if(!this.form.valid){
      return
    }

    this.login_.run(this.form.value).then((response) => {
      localStorage.setItem('potato-token', response.Token);
      this._router.navigateByUrl('/home');
    }).catch((error) => {
      this._snackBar.open(error.error.error, "",
        {
          duration: 1500,
        });
    })
  }
}
