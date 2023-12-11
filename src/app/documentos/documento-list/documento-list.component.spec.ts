/* tslint:disable:no-unused-variable */
import { TestBed, ComponentFixture, inject, async } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatCardModule, MatTableModule, MatTableDataSource, MatIconModule } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DocumentoListComponent } from './documento-list.component';


describe('DocumentoListComponent', () => {

  let component: DocumentoListComponent;
  let fixture: ComponentFixture<DocumentoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [DocumentoListComponent],
        imports: [
          ReactiveFormsModule , 
          MatCardModule,
          HttpClientTestingModule,
          RouterTestingModule,
          MatSnackBarModule,
          MatTableModule,
          MatIconModule
        ],  // Also add it to 'imports' array
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentoListComponent);
  }));

  it('Debería crear el componente', ()=>{
    const fixture = TestBed.createComponent(DocumentoListComponent)
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Debería tener un tíutlo H1', ()=>{
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'Listado Documentos'
    );
  });
});
