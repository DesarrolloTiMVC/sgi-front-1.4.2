import { Account } from './account';
import { AccountCreateComponent } from './account-create/account-create.component';

/* tslint:disable:no-unused-variable */
import { TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatCardModule, MatTableModule, MatTableDataSource, MatIconModule, MatCheckboxModule, MatDatepickerModule } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('Probando clase angular', () => {
 
  beforeEach(() => {
    TestBed.configureTestingModule({
        declarations: [],
        imports: [
          ReactiveFormsModule , 
          MatCardModule,
          HttpClientTestingModule,
          RouterTestingModule,
          MatSnackBarModule,
          MatTableModule,
          MatIconModule,
          MatCheckboxModule,
          MatDatepickerModule
        ],  // Also add it to 'imports' array
    })
    .compileComponents();

  });

  it('Prueba base solamente', ()=>{
    expect(1+1).toBe(2);
  });

});
