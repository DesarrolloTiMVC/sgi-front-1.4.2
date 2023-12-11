/* tslint:disable:no-unused-variable */
import { TestBed, ComponentFixture, inject, async } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatCardModule, MatTableModule, MatTableDataSource, MatIconModule, MatInputModule, MatRippleModule, MatPaginatorModule } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BibliotecaComponent } from './biblioteca.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('BibliotecaComponent', () => {

  let component: BibliotecaComponent;
  let fixture: ComponentFixture<BibliotecaComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [BibliotecaComponent],
        imports: [
          MatInputModule,
          MatRippleModule,
          ReactiveFormsModule , 
          MatCardModule,
          HttpClientTestingModule,
          RouterTestingModule,
          MatSnackBarModule,
          MatTableModule,
          MatIconModule,
          MatPaginatorModule,
          BrowserAnimationsModule
        ],  // Also add it to 'imports' array
    })
    .compileComponents();

    fixture = TestBed.createComponent(BibliotecaComponent);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BibliotecaComponent);
    de = fixture.debugElement;
  });

  it('Consulta si la tabla posee datos', ()=>{
    const fixture = TestBed.createComponent(BibliotecaComponent);
    const app = fixture.debugElement.componentInstance; 
    fixture.detectChanges();
    const rowDebugElements = de.queryAll(By.css('tbody tr'));
    expect(rowDebugElements.length).toBe(0);
  });

  it('Debería tener un input', ()=>{
    const fixture = TestBed.createComponent(BibliotecaComponent);
    const app = fixture.debugElement.componentInstance; 
    fixture.detectChanges();
    const inputElements = de.queryAll(By.css('input'));
    expect(inputElements.length).toBe(1);
  });

  it('Debería tener un título', ()=>{
    const fixture = TestBed.createComponent(BibliotecaComponent);
    const app = fixture.debugElement.componentInstance; 
    fixture.detectChanges();
    const inputElements = de.queryAll(By.css('h1'));
    expect(inputElements.length).toBe(1);
  });

});
