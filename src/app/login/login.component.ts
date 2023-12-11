import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { RouteConfigLoadEnd } from '@angular/router';
import { Router } from "@angular/router";
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { LoaderService } from '../services/loader.service'
import { Subject } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup
  submitted = false
  userLogged = false
  public isDisabled = true;
   mensajeError: string = '' 

  constructor(
    private formBuilder: FormBuilder,
    private _accountService: AccountService,
    private _router:Router,
    private _snackBar: MatSnackBar
    ) {    }


  ngOnInit() {
    this.buildForm()
  }

  buildForm(){
    this.formLogin = this.formBuilder.group({
      UserName: ['', Validators.required ],
      Password: ['', Validators.required ],
    });
  }

  get f() { return this.formLogin.controls; }

  onSubmit(){
    this.mensajeError = ''
    this._accountService.validateUser(this.formLogin.value)
    .subscribe(
      result => {
        localStorage.setItem("user", JSON.stringify(result));
        localStorage.setItem("role", result.Role );
        localStorage.setItem("areas", JSON.stringify(result.Areas));
        localStorage.setItem("token", result.Token)
        this._router.navigate(["app/inicio"])
      },
      error => {
        this.mensajeError = error.error.Message
      }
    )
  }
}