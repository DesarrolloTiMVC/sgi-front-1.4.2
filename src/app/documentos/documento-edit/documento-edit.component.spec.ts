/* tslint:disable:no-unused-variable */
import { TestBed, ComponentFixture, inject, async } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatCardModule, MatTableModule, MatTableDataSource, MatIconModule, MatDatepickerModule, MatCheckboxModule, MatNativeDateModule } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DocumentoEditComponent } from './documento-edit.component';

describe('DocumentoEditComponent', () => {

  let component: DocumentoEditComponent;
  let fixture: ComponentFixture<DocumentoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [DocumentoEditComponent],
        imports: [
          ReactiveFormsModule , 
          MatCardModule,
          HttpClientTestingModule,
          RouterTestingModule,
          MatSnackBarModule,
          MatTableModule,
          MatIconModule,
          MatDatepickerModule,
          MatCheckboxModule,
          MatNativeDateModule,
        ],  // Also add it to 'imports' array
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentoEditComponent);
  }));

  it('Debería crear el componente', ()=>{
    const fixture = TestBed.createComponent(DocumentoEditComponent)
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Debería tener un tíutlo H1', ()=>{
    const fixture = TestBed.createComponent(DocumentoEditComponent)
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'Editar documentos'
    );
  });

});
