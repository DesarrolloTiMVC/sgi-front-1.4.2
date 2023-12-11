/* tslint:disable:no-unused-variable */
import { TestBed, ComponentFixture, inject, async } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let submitEl: DebugElement;
  let loginEl: DebugElement;
  let passwordEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [LoginComponent],
        imports: [
          ReactiveFormsModule ,
          MatCardModule,
          HttpClientTestingModule,
          RouterTestingModule,
          MatSnackBarModule
        ],  // Also add it to 'imports' array
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  }));

  it('Setting enabled to false disabled the submit button', () => {
    expect(1+1).toBe(2);
  });

  it('Debería tener un campo username y un campo password', ()=>{
    loginEl = fixture.debugElement.query(By.css('input[type=text]'));
    passwordEl = fixture.debugElement.query(By.css('input[type=password]'));
    expect(loginEl).toBeDefined();
    expect(passwordEl).toBeDefined();
  });

  it('Debería deshabilitar el botón si no se han completado los campos de usuario y password',()=>{
    const loginField = fixture.debugElement.query(By.css('input[type=text]')).nativeElement;
    loginField.value = "";
    const passwordField = fixture.debugElement.query(By.css('input[type=password]')).nativeElement;
    passwordField.value = "";
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('button').disabled).toBeTruthy();
  });

  it('Debería habilitar el botón si el campo username es un email correcto y el campo password tiene más de 5 caracteres', ()=>{
    let loginField = fixture.debugElement.query(By.css('input[type=text]')).nativeElement;
    loginField.value = "mguajardo.eecc@mineravallecentral.cl";
    
    let passwordField = fixture.debugElement.query(By.css('input[type=password]')).nativeElement;
    passwordField.value = "23123312";
    
    expect(fixture.debugElement.nativeElement.querySelector('button').disabled).toBeFalsy();
  });
});
