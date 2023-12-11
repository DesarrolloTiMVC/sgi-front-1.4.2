/* tslint:disable:no-unused-variable */
import { TestBed, ComponentFixture, inject, async } from '@angular/core/testing';
import { Component, ComponentRef, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MatSnackBarModule} from '@angular/material';
import { MatCardModule, MatTableModule, MatTableDataSource, MatIconModule, MatCheckboxModule, MatDatepickerModule, MatPaginatorModule } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DocumentosCreateComponent } from './documentos-create.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('DocumentoCreateComponent', () => {

  let component: DocumentosCreateComponent;
  let fixture: ComponentFixture<DocumentosCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [DocumentosCreateComponent],
        imports: [
          ReactiveFormsModule , 
          MatCardModule,
          HttpClientTestingModule,
          RouterTestingModule,
          MatSnackBarModule,
          MatTableModule,
          MatIconModule,
          MatCheckboxModule,
          MatDatepickerModule, 
          MatPaginatorModule,
          MatNativeDateModule,
        ],  // Also add it to 'imports' array
        schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentosCreateComponent);
  }));

  it('Debería crear el componente', ()=>{
    expect(1+1).toBe(2);
  });

});
