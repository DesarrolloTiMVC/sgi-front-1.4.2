/* tslint:disable:no-unused-variable */
import { TestBed, ComponentFixture, inject, async } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule, MatCardModule, MatTableModule, MatTableDataSource, MatIconModule, MatCheckboxModule, MatDatepickerModule } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DocumentosComponent } from './documentos.component';


describe('DocumentComponent', () => {

  let component: DocumentosComponent;
  let fixture: ComponentFixture<DocumentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [DocumentosComponent],
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

    fixture = TestBed.createComponent(DocumentosComponent);
  }));

  it('Debería crear el componente', ()=>{
    const fixture = TestBed.createComponent(DocumentosComponent)
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Debería tener un tíutlo H1', ()=>{
    const fixture = TestBed.createComponent(DocumentosComponent)
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'Listado documentos'
    );
  });

});
