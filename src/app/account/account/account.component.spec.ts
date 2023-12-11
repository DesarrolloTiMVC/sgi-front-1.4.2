/* tslint:disable:no-unused-variable */
import { TestBed, ComponentFixture, inject, async } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatCardModule, MatTableModule, MatTableDataSource, MatIconModule, MatFormFieldModule } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountComponent } from './account.component';
import { AccountService } from 'src/app/services/account.service';
import { of } from 'rxjs';
import { Account } from '../account';

describe('AccountComponent', () => {

  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [AccountComponent],
        imports: [
          ReactiveFormsModule , 
          MatCardModule,
          HttpClientTestingModule,
          RouterTestingModule,
          MatSnackBarModule,
          MatTableModule,
          MatIconModule,
          MatFormFieldModule
        ],  // Also add it to 'imports' array
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
  }));

  
  it('Debería crear el componente', ()=>{
    expect(component).toBeDefined();
  });

  it('Debería tener un formulario al cargar el componente', ()=>{
    component.ngOnInit() 
    expect(component.formData).toBeDefined()
  }); 

  it('Debería listar datos de los usuarios al cargar el componente', () => {
    component.ngOnInit(); 
    expect(component.dataSource).not.toBeNull();
  });

  it('Se debería listar datos', () => {
    //Arrange 
    let response: Account[] = []
        //act 
    component.listarData(); 
    fixture.detectChanges(); 
  

  });





});
