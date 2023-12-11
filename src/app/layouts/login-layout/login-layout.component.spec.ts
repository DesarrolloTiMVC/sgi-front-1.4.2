/* tslint:disable:no-unused-variable */
import { TestBed, ComponentFixture, inject, async } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatCardModule, MatTableModule, MatTableDataSource, MatIconModule, MatCheckboxModule, MatDatepickerModule } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginLayoutComponent } from './login-layout.component';



describe('LoginLayoutComponent', () => {

  let component: LoginLayoutComponent;
  let fixture: ComponentFixture<LoginLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [LoginLayoutComponent],
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

    fixture = TestBed.createComponent(LoginLayoutComponent);
  }));

  it('Debería crear el componente', ()=>{
    const fixture = TestBed.createComponent(LoginLayoutComponent)
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });


});
